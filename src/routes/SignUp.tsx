import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen  bg-[#FAFAFA] sm:flex sm:justify-center sm:items-center sm:flex-col overflow-y-auto">
      <div className="w-full max-w-[467px] sm:w-[476px] min-h-[573px] sm:bg-white rounded-md sm:shadow-md p-8 ">
        <div className="flex sm:justify-center sm:items-center gap-1 w-full mb-[51px]">
          <div className="w-fit h-fit bg-white bg-opacity-5">
            <img
              className="bg-white bg-opacity-5"
              src="logo-devlinks-small.svg"
              alt="logo-devlinks-small.svg"
              loading="lazy"
              width={45}
              height={45}
            />
          </div>
          <h1 className="text-4xl font-semibold text-[#333333]">devLinks</h1>
        </div>
        <h1 className="text-3xl font-semibold text-[#333333] mb-4">
          Create account
        </h1>
        <p className="text-[#737373] mb-12">
          {" Let’s get you started sharing your links!"}
        </p>
        <form className="flex flex-col gap-10">
          <Input
            radius="sm"
            label="Email address"
            labelPlacement={"outside"}
            type="email"
            placeholder="e.g. alex@email.com"
            isRequired
            id="email"
            startContent={
              <div>
                <img src="/icon-email.svg" alt="email icon" />
              </div>
            }
            classNames={{
              input: "opacity-75",
              inputWrapper:
                "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <Input
            radius="sm"
            label="Create password"
            labelPlacement={"outside"}
            type="password"
            placeholder="At least 8 characters"
            isRequired
            id="password"
            startContent={
              <div>
                <img src="/icon-password.svg" alt="icon password" />
              </div>
            }
            classNames={{
              input: "opacity-75",
              inputWrapper:
                "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <Input
            radius="sm"
            label="Confirm password"
            labelPlacement={"outside"}
            type="password"
            placeholder="At least 8 characters"
            isRequired
            id="password"
            startContent={
              <div>
                <img src="/icon-password.svg" alt="icon password" />
              </div>
            }
            classNames={{
              input: "opacity-75",
              inputWrapper:
                "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
            }}
          />
          <p className="font-light text-sm text-[#737373] -my-4">
            Password must contain at least 8 characters
          </p>
          <Button className="dark bg-[#633CFF] rounded-md font-medium">
            Login
          </Button>
        </form>
        <div className="w-full flex items-center justify-center  font-normal flex-col sm:flex-row mt-6 sm:gap-1">
          <p className="text-[#737373]">Already have an account? </p>
          <p
            className="text-[#633CFF] cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;