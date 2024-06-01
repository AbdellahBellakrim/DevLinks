import { useReactiveVar } from "@apollo/client";
import { userState } from "../apollo-client/apollo-client";

function Mockup() {
  const User = useReactiveVar(userState);
  return (
    <div className="min-w-[50%] max-w-[560px] bg-white rounded-md hidden lg:flex shadow-md justify-center items-center">
      <div className="w-fit h-fit bg-white bg-opacity-5 relative">
        <img
          className="bg-white bg-opacity-5 min-w-8 z-0"
          src="illustration-phone-mockup.svg"
          alt="illustration-phone-mockup.svg"
          loading="lazy"
        />
        {User?.profile_picture && (
          <div className="absolute bg-white bg-opacity-5 rounded-full h-24 w-24 inset-0 top-[65px] left-[105px]">
            <img
              className="bg-white bg-opacity-5  z-0 rounded-full border-4 border-[#633CFF]"
              src={User?.profile_picture || "illustration-phone-mockup.svg"}
              alt="profile picture"
              loading="lazy"
            />
          </div>
        )}
        <div className="absolute   w-[237px] h-[420px] top-[162px] left-[35px] pt-5">
          {User?.firstname && User?.lastname && User?.email && (
            <div className="w-full flex justify-center items-center flex-col bg-white py-2">
              <h1 className="font-semibold text-lg mb-2">{`${User?.firstname} ${User?.lastname}`}</h1>
              <p className="font-normal text-sm text-[#737373]">
                {User?.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mockup;
