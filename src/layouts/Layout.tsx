import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Mockup from "../components/Mockup";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userState } from "../apollo-client/apollo-client";
import { GET_USER_BY_AUTH_ID } from "../apollo-client/queries";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useAuth0 } from "@auth0/auth0-react";

function DashboardLayout() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // get data of user from hasura cloud
  const { loading, error, data } = useQuery(GET_USER_BY_AUTH_ID, {
    variables: { auth_id: user?.sub },
  });
  // set user data to userState
  useEffect(() => {
    if (data && user && isAuthenticated) {
      const Copyuser = data.devlinks_user[0];
      userState({
        id: Copyuser.id,
        auth_id: Copyuser.auth_id,
        firstname: Copyuser.firstname,
        lastname: Copyuser.lastname,
        email: Copyuser.email,
        profile_picture: Copyuser.profile_picture,
        links: [
          ...Copyuser.links.map(
            ({
              id,
              link,
              platform,
              user_id,
            }: {
              id: number;
              link: string;
              platform: string;
              user_id: number;
            }) => ({ id, link, platform, user_id })
          ),
        ].sort((a, b) => a.id - b.id),
      });
    }
  }, [data, user, isAuthenticated]);

  // get user data from userState
  const User = useReactiveVar(userState);

  if (!isAuthenticated && !isLoading) {
    setTimeout(() => navigate("/"), 2000);
    return (
      <Error message="Hold up, stranger! Time to introduce yourself. Login or sign up to continue." />
    );
  }
  if (loading || !User || isLoading) return <Loading />;
  if (error) return <Error message={error?.message} />;
  else {
    return (
      <div className="w-screen h-screen relative bg-[#FAFAFA] flex flex-col">
        <NavBar />
        <div className="w-full max-w-[1440px] mx-auto p-0 md:p-6 flex md:gap-6  flex-grow justify-center z-0 mt-[74px]">
          <Mockup />
          <Outlet />
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
