import { useEffect, useState } from "react";
import IconLinksHeader from "./LinksIcon";
import IconProfileHeader from "./ProfileIcon";
import { useLocation, useNavigate } from "react-router-dom";

type PageType = "links" | "profile" | "preview" | string;

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<PageType>("links");
  const [isLinksHovered, setIsLinksHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const ActiveStyle: string = "bg-[#EFEBFF] text-[#633CFF]";
  const InActiveStyle: string = "bg-white text-[#737373]";

  useEffect(() => {
    setPage(location.pathname.substring(1));
  }, [location]);
  return (
    <div className="bg-white w-screen h-[74px] shadow-sm mb-4 md:mb-6 fixed top-0 z-10">
      <div className="w-full h-full max-w-[1440px] mx-auto flex justify-between items-center gap-3 p-4 px-6 z-10">
        <div
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => {}}
        >
          <div className="w-fit h-fit bg-white bg-opacity-5">
            <img
              className="bg-white bg-opacity-5 min-w-8 min-h-8"
              src="logo-devlinks-small.svg"
              alt="logo-devlinks-small.svg"
              loading="lazy"
              width={32}
              height={32}
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#333333] hidden sm:block">
            devLinks
          </h1>
        </div>
        <div className="flex justify-center items-center gap-0">
          {/* button */}
          <div
            className={`shadow-none  rounded-md font-medium text-sm flex items-center justify-center px-6 py-3 gap-1 cursor-pointer hover:text-[#633CFF] ${
              page === "links" ? ActiveStyle : InActiveStyle
            }`}
            onClick={() => {
              setPage("links");
              navigate("/links");
            }}
            onMouseEnter={() => setIsLinksHovered(true)}
            onMouseLeave={() => setIsLinksHovered(false)}
          >
            <IconLinksHeader
              fillColor={
                isLinksHovered || page === "links" ? "#633CFF" : "#737373"
              }
            />
            <p className="hidden sm:block">Links</p>
          </div>
          {/* button */}
          <div
            className={`shadow-none  rounded-md font-medium text-sm flex items-center justify-center px-6 py-3 gap-1 cursor-pointer hover:text-[#633CFF] ${
              page === "profile" ? ActiveStyle : InActiveStyle
            }`}
            onClick={() => {
              setPage("profile");
              navigate("/profile");
            }}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            <IconProfileHeader
              fillColor={`${
                isProfileHovered || page === "profile" ? "#633CFF" : "#737373"
              }`}
            />
            <p className="hidden sm:block">Profile Details</p>
          </div>
        </div>
        <div>
          {/* button */}
          <div
            onClick={() => {
              setPage("preview");
              navigate("/preview");
            }}
            className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10"
          >
            <div className="w-fit h-fit bg-white bg-opacity-5 block sm:hidden">
              <img
                className="bg-white bg-opacity-5"
                src="icon-preview-header.svg"
                alt="icon-preview-header.svg"
                loading="lazy"
                width={20}
                height={20}
              />
            </div>
            <p className="hidden sm:block">Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
