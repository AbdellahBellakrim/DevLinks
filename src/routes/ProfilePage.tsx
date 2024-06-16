import { useMutation, useReactiveVar } from "@apollo/client";
import { Button, Input } from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import { useEffect, useState } from "react";
import { UPDATE_USER_BY_PK } from "../apollo-client/mutations";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg"];
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const schema = z.object({
  firstname: z
    .string()
    .min(1, "Can't be empty")
    .max(50, "Too long!")
    .regex(/^[a-zA-Z\s-']+$/, "Invalid first name!")
    .refine((val) => val.trim().length > 0, "Can't be empty or spaces"),
  lastname: z
    .string()
    .min(1, "Can't be empty")
    .max(50, "Too long!")
    .regex(/^[a-zA-Z\s-']+$/, "Invalid last name!")
    .refine((val) => val.trim().length > 0, "Can't be empty or spaces"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((val) => val.trim().length > 0, "Can't be empty or spaces"),
  profilePicture: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      "File size must be less than 3MB"
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "File must be a PNG or JPG image"
    )
    .nullable(),
});

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
const CLOUDINARY_ENDPOINT = import.meta.env.VITE_CLOUDINARY_ENDPOINT;

function ProfilePage() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < 640
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: User?.firstname || "",
      lastname: User?.lastname || "",
      email: User?.email || "",
      profilePicture: null,
    },
  });

  useEffect(() => {
    if (User) {
      setImagePreview(User.profile_picture);
    }
  }, [User]);

  const handleDivClick = () => {
    document.getElementById("file-input")?.click();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    if (!User) return;
    if (!isDirty && !imageFile) {
      toast.error("No changes detected!", {
        position: "bottom-center",
        duration: 2000,
        style: {
          width: "fit-content",
          maxWidth: "406px",
          padding: "16px 24px",
          color: "#FAFAFA",
          backgroundColor: "red",
        },
      });
      return;
    }

    // if (imageFile) {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    // formData.append("upload_preset", CLOUDINARY_PRESET);

    // const response = await fetch(CLOUDINARY_ENDPOINT, {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await response.json();
    // setImagePreview(data.secure_url);
    // }
    toast.success("Your changes have been successfully saved!", {
      position: "bottom-center",
      duration: 2000,
      style: {
        width: "fit-content",
        maxWidth: "406px",
        padding: "16px 24px",
        color: "#FAFAFA",
        backgroundColor: "green",
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-grow max-w-[808px] bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md"
    >
      <h1 className="font-bold text-3xl mb-3">Profile Details</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add your details to create a personal touch to your profile.
      </p>
      <div className="flex-grow  mb-6 border-b border-divider">
        {/* first container */}
        <div className=" min-h-[233px] rounded-xl bg-[#FAFAFA]  mb-6 p-5 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-6">
          <h2 className="w-[40%] font-normal text-sm text-[#737373]">
            Profile Picture
          </h2>
          <div
            onClick={handleDivClick}
            className="relative group w-[193px] bg-[#633CFF] bg-opacity-10 h-[193px] min-w-[193px] min-h-[193px] rounded-md cursor-pointer flex justify-center items-center flex-col hover:opacity-80"
          >
            <input
              {...register("profilePicture")}
              id="file-input"
              type="file"
              accept=".png, .jpg"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  console.log(file);
                  const validImageTypes = ["image/jpeg", "image/png"];
                  if (!validImageTypes.includes(file.type)) {
                    toast.error(
                      "Please upload a file with a valid image format (PNG or JPG).",
                      {
                        position: "bottom-center",
                        duration: 2000,
                        style: {
                          width: "fit-content",
                          maxWidth: "406px",
                          padding: "16px 24px",
                          color: "#FAFAFA",
                          backgroundColor: "red",
                        },
                      }
                    );
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                    User &&
                      userState({
                        ...User,
                        profile_picture: reader.result as string,
                      });
                  };
                  reader.readAsDataURL(file);
                  setImageFile(file);
                  setValue("profilePicture", file);
                }
              }}
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
          <div>
            <p className="font-normal text-xs text-[#737373]">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
            {errors.profilePicture && (
              <p className="text-[#FF3939]  w-full text-xs mt-2">
                {errors.profilePicture.message}
              </p>
            )}
          </div>
        </div>
        {/* second container */}
        <div className="min-h-[208px] rounded-xl bg-[#FAFAFA] p-5 flex flex-col gap-5">
          <Input
            // div to show errors
            endContent={
              errors.firstname ? (
                <div className=" text-[#FF3939] text-center min-w-fit h-fit text-xs">
                  {errors.firstname.message}
                </div>
              ) : null
            }
            {...register("firstname")}
            radius="sm"
            label="First name"
            labelPlacement={isSmallScreen ? "outside" : "outside-left"}
            type="text"
            placeholder={"e.g. John"}
            classNames={{
              base: "text-[#737373]",
              label:
                "w-full sm:w-[40%] font-normal  text-md text-[#737373] opacity-70 sm:opacity-100",
              mainWrapper: "w-full sm:w-[60%]",
              input: "opacity-75",
              inputWrapper: errors.firstname
                ? "border border-[#FF3939] text-[#FF3939]  rounded-md focus-within:border-[#FF3939]"
                : "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <Input
            // div to show errors
            endContent={
              errors.lastname ? (
                <div className=" text-[#FF3939] text-center min-w-fit h-fit text-xs">
                  {errors.lastname.message}
                </div>
              ) : null
            }
            {...register("lastname")}
            radius="sm"
            label="Last name"
            labelPlacement={isSmallScreen ? "outside" : "outside-left"}
            type="text"
            placeholder={"Wright"}
            classNames={{
              base: "text-[#737373]",
              label:
                "w-full sm:w-[40%] font-normal  text-md text-[#737373] opacity-70 sm:opacity-100",
              mainWrapper: "w-full sm:w-[60%]",
              input: "opacity-75",
              inputWrapper: errors.lastname
                ? "border border-[#FF3939] text-[#FF3939]  rounded-md focus-within:border-[#FF3939]"
                : "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <Input
            // div to show errors
            endContent={
              errors.email ? (
                <div className=" text-[#FF3939] text-center min-w-fit h-fit text-xs">
                  {errors.email.message}
                </div>
              ) : null
            }
            {...register("email")}
            radius="sm"
            label="Email"
            labelPlacement={isSmallScreen ? "outside" : "outside-left"}
            type="text"
            placeholder={"ben@example.com"}
            classNames={{
              base: "text-[#737373] z-0",
              label:
                "w-full sm:w-[40%] font-normal  text-md text-[#737373] opacity-70 sm:opacity-100",
              mainWrapper: "w-full sm:w-[60%]",
              input: "opacity-75",
              inputWrapper: errors.email
                ? "border border-[#FF3939] text-[#FF3939]  rounded-md focus-within:border-[#FF3939]"
                : "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
        </div>
      </div>
      {/* save button */}
      <div className="h-fit w-full flex items-center justify-end">
        <Button
          type="submit"
          className={`rounded-md bg-[#633CFF] text-white w-full sm:w-auto`}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default ProfilePage;
