import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GET_USER_DATA_BY_USERNAME } from "../apollo-client/queries";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useEffect, useState } from "react";
import SocialButton from "../components/SocialButton";
import { LinkType } from "../apollo-client/types";

type previewUserType = {
  firstname: string;
  lastname: string;
  email: string;
  profile_picture: string;
  links: {
    id: number;
    link: string;
    platform: string;
  }[];
};

function PreviewPage({ username }: { username: string }) {
  const [previewUser, setPreviewUser] = useState<previewUserType | null>(null);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USER_DATA_BY_USERNAME, {
    variables: { username },
  });

  useEffect(() => {
    if (data && data.devlinks_user.length > 0) {
      const user = data.devlinks_user[0];
      setPreviewUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profile_picture: user.profile_picture,
        links: user.links,
      });
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error?.message} />;

  if (!data || !data.devlinks_user || data.devlinks_user.length === 0) {
    return <Error message={`No data found for user: ${username}`} />;
  }

  return (
    <div className="w-screen h-screen  bg-[#FAFAFA] relative">
      {/* bacground cover  */}
      <div className="absolute z-[-1] w-full h-[357px] bg-[#633CFF] rounded-b-2xl inset-0 top-0 hidden sm:block"></div>
      {/* nav */}
      <div className="sticky sm:absolute z-10 inset-0 top-0 w-full sm:w-[calc(100%-48px)] h-[78px] bg-[#FAFAFA]  sm:rounded-xl m-0 sm:m-6 p-4 px-7  flex justify-between items-center gap-4">
        {/* button */}
        <div
          onClick={() => {
            navigate("/links");
          }}
          className="w-[160px] h-full border-1 border-[#633CFF] font-semibold text-sm text-[#633CFF] rounded-md  flex items-center justify-center cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10"
        >
          Back to Editor
        </div>
        {/* button */}
        <Button
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard
              .writeText(url)
              .then(() => {
                toast("The link has been copied to your clipboard!", {
                  position: "bottom-center",
                  duration: 2000,
                  style: {
                    width: "fit-content",
                    maxWidth: "406px",
                    padding: "16px 24px",
                    color: "#FAFAFA",
                    backgroundColor: "#333333",
                  },
                });
              })
              .catch((err) => {
                console.error("Failed to copy URL: ", err);
              });
          }}
          className="w-[160px] h-full  font-semibold text-sm  rounded-md  flex items-center justify-center dark bg-[#633CFF]"
        >
          Share Link
        </Button>
      </div>
      {/* cart */}
      <div className="absolute inset-0 w-full sm:w-[349px] h-fit sm:h-[569px] sm:rounded-2xl bg-[#FAFAFA] sm:shadow-md mt-[78px] sm:mt-52 mb-6 mx-auto py-12 px-8  md:px-14">
        <div className="w-full h-full  sm:overflow-auto sm:scrollbar-hide rounded-lg">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden  mb-6 bg-black bg-opacity-10 mx-auto">
            {previewUser?.profile_picture && (
              <img
                className="w-full h-full object-cover border-5 border-[#633CFF] rounded-full"
                src={previewUser?.profile_picture}
                alt="profile picture"
              />
            )}
          </div>
          <h1 className="font-bold text-2xl text-[#333333] mb-4 mx-auto text-center">
            {previewUser?.firstname} {previewUser?.lastname}
          </h1>
          <p className="font-normal text-sm text-[#737373] mb-12 mx-auto text-center ">
            {previewUser?.email}
          </p>
          <div className="w-full  gap-5 flex flex-col items-center">
            {previewUser !== null &&
              previewUser?.links.length &&
              previewUser.links.map((link: LinkType) => {
                return (
                  <SocialButton
                    platform={link.platform}
                    link={link.link}
                    key={link.id}
                    height="h-[56px]"
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
