import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-10 md:max-w-[920px] mx-auto p-4 relative">
      <div className="flex justify-center items-center gap-1 w-full">
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
      <div className="w-full flex justify-center items-center gap-7 overflow-hidden flex-row">
        <Button
          className="dark bg-[#633CFF] rounded-md font-medium"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="dark bg-[#633CFF] rounded-md font-medium"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>

      <div className="absolute w-screen h-fit py-5 px-4 bottom-0 border-t border-divider flex justify-center items-center gap-3">
        <p className="text-[#737373]">
          By{" "}
          <a
            className="hover:underline hover:cursor-pointer"
            href="https://www.abdellahbellakrim.tech"
            target="_blank"
          >
            Abdellah Bellakrim
          </a>{" "}
          | No copyright ©
        </p>
      </div>
    </div>
  );
}

export default HomePage;

// w-full max-w-[396px] p-0 h-12 rounded-md font-semibold
