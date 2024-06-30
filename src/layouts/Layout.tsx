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
  const { user, isAuthenticated, isLoading, error: auth0Error } = useAuth0();
  const navigate = useNavigate();

  // get data of user from hasura cloud
  const { loading, error, data } = useQuery(GET_USER_BY_AUTH_ID, {
    variables: { auth_id: user?.sub },
  });
  // set user data to userState
  useEffect(() => {
    if (data && user && isAuthenticated) {
      userState({
        id: data.devlinks_user[0].id,
        auth_id: data.devlinks_user[0].auth_id,
        firstname: data.devlinks_user[0].firstname,
        lastname: data.devlinks_user[0].lastname,
        email: data.devlinks_user[0].email,
        profile_picture: data.devlinks_user[0].profile_picture,
        links: [
          ...data.devlinks_user[0].links.map(
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

  if (auth0Error) return <Error message={auth0Error.message} />;
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
