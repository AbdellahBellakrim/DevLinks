import { useMutation, useReactiveVar } from "@apollo/client";
import { Button, Input } from "@nextui-org/react";
import { dataChangingState, userState } from "../apollo-client/apollo-client";
import { useEffect, useState } from "react";
import { UPDATE_USER_BY_PK } from "../apollo-client/mutations";
import { userType } from "../apollo-client/types";
import toast from "react-hot-toast";

function ProfilePage() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < 640
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
  const CLOUDINARY_ENDPOINT = import.meta.env.VITE_CLOUDINARY_ENDPOINT;

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  // get user data from userState
  const User = useReactiveVar(userState);
  // get the update user mutation
  const [updateUser] = useMutation(UPDATE_USER_BY_PK);

  useEffect(() => {
    if (User) {
      setImagePreview(User.profile_picture);
    }
  }, [User]);

  useEffect(() => {
    setFirstName(User?.firstname || "");
    setLastName(User?.lastname || "");
    setEmail(User?.email || "");
  }, [User]);

  const handleDivClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (
      selectedImage ||
      ((firstName !== User?.firstname ||
        lastName !== User?.lastname ||
        email !== User?.email) &&
        firstName !== "" &&
        lastName !== "" &&
        email !== "")
    ) {
      dataChangingState(true);
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
        formData.append("upload_preset", CLOUDINARY_PRESET);

        const response = await fetch(CLOUDINARY_ENDPOINT, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setImagePreview(data.secure_url);
        userState({
          ...User,
          profile_picture: data.secure_url,
          firstname: firstName,
          lastname: lastName,
          email: email,
        } as userType);
        updateUser({
          variables: {
            id: User?.id,
            lastname: lastName,
            email: email,
            firstname: firstName,
            profile_picture: data.secure_url,
          },
        });
      } else {
        userState({
          ...User,
          firstname: firstName,
          lastname: lastName,
          email: email,
        } as userType);
        updateUser({
          variables: {
            id: User?.id,
            lastname: lastName,
            email: email,
            firstname: firstName,
            profile_picture: User?.profile_picture,
          },
        });
      }
      dataChangingState(false);
      toast("Your changes have been successfully saved!", {
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
    }
  };

  return (
    <div className="flex-grow max-w-[808px] bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md">
      <h1 className="font-bold text-3xl mb-3">Profile Details</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add your details to create a personal touch to your profile.
      </p>
      <div className="flex-grow  mb-6 border-b border-divider">
        {/* first container */}
        <div className="min-h-[233px] rounded-xl bg-[#FAFAFA]  mb-6 p-5 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-6">
          <h2 className="w-[40%] font-normal text-sm text-[#737373]">
            Profile Picture
          </h2>
          <div
            onClick={handleDivClick}
            className="relative group w-[193px] bg-[#633CFF] bg-opacity-10 h-[193px] min-w-[193px] min-h-[193px] rounded-md cursor-pointer flex justify-center items-center flex-col hover:opacity-80"
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {imagePreview === null ? (
              <>
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
              </>
            ) : (
              <>
                <img
                  className="min-w-full min-h-full z-0 rounded-md bg-white bg-opacity-5  group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  src={imagePreview}
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
                  <p className="text-white font-semibold text-sm">
                    Change Image
                  </p>
                </div>
              </>
            )}
          </div>

          <p className="font-normal text-xs text-[#737373]">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
        {/* second container (form) */}
        <form className="min-h-[208px] rounded-xl bg-[#FAFAFA] p-5 flex flex-col gap-5">
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            radius="sm"
            value={firstName}
            label="First name"
            labelPlacement={isSmallScreen ? "outside" : "outside-left"}
            type="text"
            placeholder={"e.g. John"}
            isRequired
            classNames={{
              base: "text-[#737373]",
              label:
                "w-full sm:w-[40%] font-normal  text-md text-[#737373] opacity-70 sm:opacity-100",
              mainWrapper: "w-full sm:w-[60%]",
              input: "opacity-75",
              inputWrapper:
                "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            radius="sm"
            label="Last name"
            labelPlacement={isSmallScreen ? "outside" : "outside-left"}
            type="text"
            placeholder={"Wright"}
            isRequired
            classNames={{
              base: "text-[#737373]",
              label:
                "w-full sm:w-[40%] font-normal  text-md text-[#737373] opacity-70 sm:opacity-100",
              mainWrapper: "w-full sm:w-[60%]",
              input: "opacity-75",
              inputWrapper:
                "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            radius="sm"
            label="Email"
            labelPlacement={isSmallScreen ? "outside" : "outside-left"}
            type="email"
            placeholder={"ben@example.com"}
            isRequired
            classNames={{
              base: "text-[#737373] z-0",
              label:
                "w-full sm:w-[40%] font-normal  text-md text-[#737373] opacity-70 sm:opacity-100",
              mainWrapper: "w-full sm:w-[60%]",
              input: "opacity-75",
              inputWrapper:
                "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
        </form>
      </div>
      {/* save button */}
      <div className="h-fit w-full flex items-center justify-end">
        <Button
          onClick={handleSave}
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
