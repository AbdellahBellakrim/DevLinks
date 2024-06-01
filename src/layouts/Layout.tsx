import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Mockup from "../components/Mockup";
import { useQuery, useReactiveVar } from "@apollo/client";
import { dataChangingState, userState } from "../apollo-client/apollo-client";
import { GET_USER_BY_ID } from "../apollo-client/queries";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ChangingData from "../components/ChangingData";

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
  const DataChaging = useReactiveVar(dataChangingState);

  if (loading || !User) return <Loading />;
  if (error) return <Error message={error?.message} />;
  else {
    return (
      <div className="w-screen h-screen relative bg-[#FAFAFA] flex flex-col">
        <NavBar />
        <div className="w-full max-w-[1440px] mx-auto p-0 md:p-6 flex md:gap-6  flex-grow justify-center z-0 mt-[74px]">
          <Mockup />
          <Outlet />
        </div>
        {DataChaging && <ChangingData />}
      </div>
    );
  }
}

export default DashboardLayout;
