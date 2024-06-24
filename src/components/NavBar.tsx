import { useEffect, useState } from "react";
import IconLinksHeader from "./Icons/LinksIcon";
import IconProfileHeader from "./Icons/ProfileIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { userState } from "../apollo-client/apollo-client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
} from "@nextui-org/react";

type PageType = "links" | "profile" | "preview" | string;

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<PageType>("links");
  const [isLinksHovered, setIsLinksHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const User = useReactiveVar(userState);

  const ActiveStyle: string = "bg-[#EFEBFF] text-[#633CFF]";
  const InActiveStyle: string = "bg-white text-[#737373]";

  useEffect(() => {
    setPage(location.pathname.substring(1));
  }, [location]);
  return (
    <Navbar
      className="bg-white w-screen h-[74px] shadow-sm mb-4 md:mb-6 fixed top-0 z-10"
      classNames={{
        wrapper: "m-0 p-0",
        brand: "m-0 p-0",
        content: "m-0 p-0",
        item: "m-0 p-0",
        menu: "m-0 p-0", // the one that appears when the menu is open
        menuItem: "m-0 p-0",
      }}
    >
      <div className="w-full h-full max-w-[1440px] mx-auto flex justify-between items-center gap-3  px-4  z-10">
        <div
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => {
            setPage("links");
            navigate("/links");
          }}
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="min-w-8 min-h-8 rounded-full">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              name="Jason Hughes"
              src={User?.profile_picture || ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{User?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="Preview"
              color="secondary"
              onClick={() => {
                setPage("preview");
                navigate(`/preview?email=${User?.email}`);
              }}
            >
              Preview
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default NavBar;
