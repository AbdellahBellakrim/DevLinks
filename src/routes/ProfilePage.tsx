import { useReactiveVar } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import { useEffect, useState } from "react";

function ProfilePage() {
  const [updatedUser, setUpdatedUser] = useState<any>({});

  // get user data from userState
  const User = useReactiveVar(userState);

  useEffect(() => {
    if (User) {
      setUpdatedUser({
        ...User,
        profile_picture:
          "https://i.pinimg.com/736x/2b/a2/45/2ba2455ca817f7659e9ebfe9d494c5db.jpg",
      });
    }
  }, [User]);

  useEffect(() => {
    console.log(updatedUser);
  }, [updatedUser]);

  return (
    <div className="flex-grow max-w-[808px] bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md">
      <h1 className="font-bold text-3xl mb-3">Profile Details</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add your details to create a personal touch to your profile.
      </p>
      <div className="flex-grow  mb-6 border-b border-divider">
        {/* first container */}
        <div className="min-h-[233px] rounded-xl bg-black bg-opacity-5  mb-6 p-5 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-6">
          <h2 className="w-[40%] font-normal text-sm text-[#737373]">
            Profile Picture
          </h2>
          {updatedUser.profile_picture === null ? (
            <div className="min-w-[193px] min-h-[193px] bg-[#633CFF] bg-opacity-10 rounded-md cursor-pointer flex justify-center items-center flex-col hover:opacity-80">
              <div className="w-fit h-fit bg-white bg-opacity-5">
                <img
                  className="bg-white bg-opacity-5 z-0"
                  src="icon-upload-image.svg"
                  alt="icon-upload-image.svg"
                  loading="lazy"
                />
              </div>
              <p className="text-[#633CFF] font-semibold text-sm">
                + Upload Image
              </p>
            </div>
          ) : (
            <div className="relative group w-[193px] h-[193px] min-w-[193px] min-h-[193px] rounded-md cursor-pointer flex justify-center items-center flex-col hover:opacity-80">
              <img
                className="w-full h-full z-0 rounded-md bg-white bg-opacity-5  group-hover:scale-95 transition-transform duration-300 ease-in-out"
                src={updatedUser.profile_picture}
                alt="profile_picture"
                loading="lazy"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="absolute  text-white inset-0 m-auto w-full h-full hidden group-hover:flex items-center justify-center flex-col">
                <div className="w-fit h-fit bg-white bg-opacity-5">
                  <img
                    className="bg-white bg-opacity-5 z-0"
                    src="icon-upload-image-white.svg"
                    alt="icon-upload-image-white.svg"
                    loading="lazy"
                  />
                </div>
                <p className="text-white font-semibold text-sm">Change Image</p>
              </div>
            </div>
          )}
          <p className="font-normal text-xs text-[#737373]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
        {/* second container (form) */}
        <div className="min-h-[208px] rounded-xl bg-black bg-opacity-5 p-5"></div>
      </div>
      {/* save button */}
      <div className="h-fit w-full flex items-center justify-end">
        <Button
          className={`rounded-md bg-[#633CFF] text-white w-full sm:w-auto`}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;

// ${linksNumber === 0 ? "opacity-40" : "opacity-100"}
