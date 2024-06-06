import { Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { platforms } from "../apollo-client/apollo-client";
import { iconComponents } from "./SocialButton";
import { LinkType } from "../apollo-client/types";
import { UseFormRegister } from "react-hook-form";
import { FormFields } from "../routes/LinksPage";

const linkExamples: any = {
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

function LinkCard({
  index,
  link,
  register,
  remove,
  update,
}: {
  index: number;
  link: LinkType;
  register: UseFormRegister<FormFields>;
  remove: (index: number) => void;
  update: (index: number, data: LinkType) => void;
}) {
  // ======= remove link from links =======
  const removeLinkFromUpdatedLinks = (index: number) => {
    remove(index);
  };
  return (
    <div className="mb-6  h-[228px] w-full">
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
            {...register(`links.${index}.platform` as const)}
            label="Platform"
            placeholder={link.platform}
            labelPlacement="outside"
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
            onChange={(e) => {
              const selectedValue = Number(e.target.value);
              update(index, {
                ...link,
                platform: platforms[selectedValue],
              });
            }}
          >
            {platforms.map((platform: string, index: number) => {
              const IconComponentItems = iconComponents[platform] || null;

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
            {...register(`links.${index}.link` as const)}
            radius="sm"
            label="Link"
            labelPlacement={"outside"}
            defaultValue={link.link}
            // onChange={(e) => {
            //   const updatedLinks = links.map((l, i) =>
            //     i === index ? { ...l, link: e.target.value } : l
            //   );
            //   setLinks(updatedLinks);
            // }}
            type="text"
            placeholder={linkExamples[link.platform] || ""}
            startContent={
              <div>
                <img src="/icon-links-header.svg" alt="link img" />
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
}

export default LinkCard;
