import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <form className="w-screen h-screen  bg-[#FAFAFA] sm:flex sm:justify-center sm:items-center sm:flex-col overflow-y-auto">
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
        <h1 className="text-3xl font-semibold text-[#333333] mb-4">Login</h1>
        <p className="text-[#737373] mb-12">
          Add your details below to get back into the app
        </p>
        <div className="flex flex-col gap-10">
          <Input
            radius="sm"
            label="Email address"
            labelPlacement={"outside"}
            type="email"
            placeholder="e.g. alex@email.com"
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
          <div className="flex justify-end items-center -my-6">
            <p className="text-[#737373] text-sm font-normal cursor-pointer hover:underline hover:text-[#633CFF]">
              Forgot password?
            </p>
          </div>
          <Input
            radius="sm"
            label="Password"
            labelPlacement={"outside"}
            type="password"
            placeholder="Enter your password"
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
          <Button className="dark bg-[#633CFF] rounded-md font-medium">
            Login
          </Button>
        </div>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-divider"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            className="w-full rounded-md font-medium  mt-3 text-[#333333] bg-black bg-opacity-5 border border-[#E0E0E0]"
            variant="solid"
            startContent={
              <img
                src="/icongithub.svg"
                alt="github icon"
                className="w-4 h-4"
              />
            }
          >
            Github
          </Button>
          <Button
            className="w-full rounded-md font-medium  mt-3 text-[#333333] bg-black bg-opacity-5 border border-[#E0E0E0]"
            variant="solid"
            startContent={
              <img
                src="/icontwitter.svg"
                alt="twitter icon"
                className="w-5 h-5"
              />
            }
          >
            Twitter
          </Button>
        </div>
        <Button
          className="w-full rounded-md font-medium  mt-3 text-[#333333] bg-black bg-opacity-5 border border-[#E0E0E0]"
          variant="solid"
          startContent={
            <img src="/icon-google.svg" alt="google icon" className="w-4 h-4" />
          }
        >
          Google
        </Button>

        <div className="w-full flex items-center justify-center  font-normal flex-col sm:flex-row mt-6 sm:gap-1">
          <p className="text-[#737373]">Don't have an account? </p>
          <p
            className="text-[#633CFF] cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Create account
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;
