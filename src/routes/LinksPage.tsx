import { useReactiveVar } from "@apollo/client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  SelectSection,
} from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import { platforms } from "../apollo-client/apollo-client";
import { iconComponents } from "../components/SocialButton";
import toast from "react-hot-toast";
import { LinkType } from "../apollo-client/types";

export const linkExamples: any = {
  Github: "e.g. https://www.github.com/johnappleseed",
  "Frontend Mentor": "e.g. https://www.frontendmentor.io/profile/johnappleseed",
  Twitter: "e.g. https://www.twitter.com/johnappleseed",
  Linkedin: "e.g. https://www.linkedin.com/in/johnappleseed",
  Youtube: "e.g. https://www.youtube.com/johnappleseed",
  Facebook: "e.g. https://www.facebook.com/johnappleseed",
  Twitch: "e.g. https://www.twitch.tv/johnappleseed",
  "Dev.to": "e.g. https://www.dev.to/johnappleseed",
  Codewars: "e.g. https://www.codewars.com/users/johnappleseed",
  Codepen: "e.g. https://codepen.io/johnappleseed",
  freeCodeCamp: "e.g. https://www.freecodecamp.org/johnappleseed",
  Gitlab: "e.g. https://gitlab.com/johnappleseed",
  Hashnode: "e.g. https://hashnode.com/@johnappleseed",
  "Stack Overflow": "e.g. https://stackoverflow.com/users/.../johnappleseed",
};

function LinksPage() {
  const User = useReactiveVar(userState);

  const removeLinkFromUpdatedLinks = (index: number) => {
    const links = User?.links;

    if (links && links.length) {
      const updatedLinks = links.filter((_, i) => i !== index);
      userState({
        ...User,
        links: updatedLinks,
      });
    } else {
      return;
    }
  };

  return (
    <div className="flex-grow max-w-[808px] bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md">
      <h1 className="font-bold text-3xl mb-3">Customize your links</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      {/* add new link button */}
      <div
        onClick={() => {}}
        className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10 mb-8"
      >
        + Add new Link
      </div>
      {User && User.links.length > 0 && (
        <div className="mb-6 flex-grow border-b border-divider">
          <div className="h-[480px] overflow-y-auto no-scrollbar">
            {/* each link div */}
            {User &&
              User.links.map((link: LinkType, index: number) => {
                return (
                  <div className="mb-6  h-[228px] w-full" key={link.id}>
                    <div className="w-full h-[228px] bg-[#FAFAFA] border border-divider rounded-xl p-5 flex flex-col">
                      {/* card header */}
                      <div className="w-full flex items-center justify-between mb-3">
                        <div className="flex items-center justify-center gap-2 cursor-grab active:cursor-grabbing">
                          <div className="w-fit h-fit bg-white bg-opacity-5">
                            <img
                              className="bg-white bg-opacity-5 z-0"
                              src="icon-drag-and-drop.svg"
                              alt="icon-drag-and-drop.svg"
                              loading="lazy"
                              width={12}
                              height={6}
                            />
                          </div>
                          <p className="text-[#737373] font-semibold text-lg">{`Link #${
                            index + 1
                          }`}</p>
                        </div>
                        <p
                          className="font-normal text-md text-[#737373] cursor-pointer hover:text-[#633CFF]"
                          onClick={() => removeLinkFromUpdatedLinks(index)}
                        >
                          Remove
                        </p>
                      </div>
                      {/* form */}
                      <div className="flex-grow">
                        <Select
                          isRequired
                          label="Platform"
                          placeholder={link.platform}
                          labelPlacement="outside"
                          value={link.platform || platforms[0]}
                          classNames={{
                            value: "opacity-75",
                            label: "opacity-85 font-normal",
                            mainWrapper: "mb-6",
                            trigger:
                              "border border-[#E0E0E0]  rounded-md focus-within:bg-white focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue ",
                            popoverContent: "rounded-md mt-2",
                          }}
                          listboxProps={{
                            itemClasses: {
                              base: [
                                "rounded-md",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:bg-default-100",
                                "data-[selectable=true]:focus:bg-default-50",
                                "data-[selectable=true]:focus:text-[#633CFF]",
                                "data-[pressed=true]:opacity-70",
                                "data-[focus-visible=true]:ring-default-500",
                              ],
                            },
                          }}
                          renderValue={(items) => {
                            return items.map((item) => {
                              const IconComponentItems =
                                iconComponents[item.textValue || ""] || null;

                              return (
                                <div key={item.key} className="flex gap-4">
                                  {IconComponentItems && (
                                    <IconComponentItems fillColor="#737373" />
                                  )}
                                  <p>{item.textValue}</p>
                                </div>
                              );
                            });
                          }}
                          onChange={(e: any) => {
                            // toast(
                            //   "You already have a link with this platform!",
                            //   {
                            //     position: "top-center",
                            //     duration: 2000,
                            //     style: {
                            //       width: "fit-content",
                            //       maxWidth: "406px",
                            //       padding: "16px 24px",
                            //       color: "#FAFAFA",
                            //       backgroundColor: "#333333",
                            //     },
                            //   }
                            // );
                            if (!e.target.value) return;
                            const updatedLinks = User?.links.map((l, i) =>
                              i === index
                                ? {
                                    ...l,
                                    platform: platforms[e.target.value],
                                  }
                                : l
                            );
                            userState({
                              ...User,
                              links: updatedLinks,
                            });
                          }}
                        >
                          {platforms.map((platform, index) => {
                            const IconComponentItems =
                              iconComponents[platform] || null;

                            return (
                              <SelectSection showDivider key={index}>
                                <SelectItem
                                  value={platform}
                                  key={index}
                                  className=" rounded-none text-[#737373]"
                                  startContent={
                                    IconComponentItems && (
                                      <IconComponentItems fillColor="#737373" />
                                    )
                                  }
                                >
                                  {platform}
                                </SelectItem>
                              </SelectSection>
                            );
                          })}
                        </Select>
                        <Input
                          isRequired
                          radius="sm"
                          label="Link"
                          labelPlacement={"outside"}
                          value={link.link}
                          onChange={(e) => {
                            const updatedLinks = User?.links.map((l, i) =>
                              i === index ? { ...l, link: e.target.value } : l
                            );
                            userState({
                              ...User,
                              links: updatedLinks,
                            });
                          }}
                          type="text"
                          placeholder={linkExamples[link.platform] || ""}
                          startContent={
                            <div>
                              <img
                                src="/icon-links-header.svg"
                                alt="link img"
                              />
                            </div>
                          }
                          classNames={{
                            inputWrapper:
                              "border border-[#E0E0E0]  rounded-md focus-within:border-[#633CFF] focus-within:shadow-2xl focus-within:shadow-custom-blue",
                            label: "opacity-85 font-normal",
                            input: "opacity-75",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* if there is no links component */}
      {User && User?.links.length === 0 && (
        <div className="w-full h-full bg-[#FAFAFA]   flex justify-center items-center flex-col p-5 shadow-sm flex-grow mb-6">
          <div className="w-fit h-fit bg-white bg-opacity-5 mb-6">
            <img
              className="bg-white bg-opacity-5 min-w-8 min-h-8 z-0"
              src="illustration-empty.svg"
              alt="illustration-empty.svg"
              loading="lazy"
              width={250}
              height={160}
            />
          </div>
          <div className="max-w-[488px] flex flex-col justify-center items-center gap-6">
            <h3 className="text-2xl font-semibold text-blac">{`Let’s get you started`}</h3>
            <p className="font-normal text-[#737373] text-md">
              {`Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!`}
            </p>
          </div>
        </div>
      )}
      {/* save button */}
      <div className="h-fit w-full flex items-center justify-end">
        <Button
          className={`rounded-md bg-[#633CFF] text-white  w-full sm:w-auto`}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default LinksPage;
