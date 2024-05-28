import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Mockup from "../components/Mockup";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userState } from "../apollo-client/apollo-client";
import { GET_USER_BY_ID } from "../apollo-client/queries";
import { useEffect } from "react";

function DashboardLayout() {
  // get data of user from hasura cloud
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: 1 },
  });

  // set user data to userState
  useEffect(() => {
    if (data) {
      userState({
        id: data.devlinks_user_by_pk.id,
        firstname: data.devlinks_user_by_pk.firstname,
        lastname: data.devlinks_user_by_pk.lastname,
        username: data.devlinks_user_by_pk.username,
        email: data.devlinks_user_by_pk.email,
        profile_picture: data.devlinks_user_by_pk.profile_picture,
        links: data.devlinks_user_by_pk.links,
      });
    }
  }, [data]);

  // get user data from userState
  const User = useReactiveVar(userState);

  useEffect(() => {
    console.log(User?.links);
  }, [User]);

  if (loading || !User) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;
  else {
    return (
      <div className="w-screen h-screen relative bg-[#FAFAFA]">
        <NavBar />
        <div className="h-[calc(100%-74px-16px)] md:h-[calc(100%-74px-24px)] w-full mt-4 md:mt-6  p-0 md:p-6 flex justify-center items-center gap-6">
          <Mockup />
          <Outlet />
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
