import { useReactiveVar } from "@apollo/client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { userState } from "../apollo-client/apollo-client";
import { platforms } from "../apollo-client/apollo-client";

function LinksPage() {
  const User = useReactiveVar(userState);
  const [linksNumber, setLinksNumber] = useState<number>(0);
  const [UpdatedLinks, setUpdatedLinks] = useState<any[]>([]);

  useEffect(() => {
    if (User) {
      setUpdatedLinks(User.links);
    }
  }, [User]);

  useEffect(() => {
    setLinksNumber(UpdatedLinks.length);
  }, [UpdatedLinks]);

  const removeLinkFromUpdatedLinks = (index: number) => {
    setUpdatedLinks((prev) => prev.filter((_, i) => i !== index));
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
        onClick={() => setLinksNumber(linksNumber + 1)}
        className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10 mb-8"
      >
        + Add new Link
      </div>
      {linksNumber > 0 && (
        <div className="mb-6 flex-grow border-b border-divider">
          <div className="h-[485px] overflow-y-auto no-scrollbar">
            {/* each link div */}
            {UpdatedLinks.map((link, index: number) => (
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
                      <p className="text-[#737373] font-semibold text-lg">{`Link #${link.id}`}</p>
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
                    >
                      {platforms.map((platform, index) => (
                        <SelectItem
                          key={index}
                          className="border-b border-divider rounded-none text-[#737373]"
                        >
                          {platform}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      radius="sm"
                      label="Link"
                      labelPlacement={"outside"}
                      type="text"
                      placeholder={link.link}
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
            ))}
          </div>
        </div>
      )}

      {/* if there is no links component */}
      {linksNumber === 0 && (
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
          className={`rounded-md bg-[#633CFF] text-white ${
            linksNumber === 0 ? "opacity-40" : "opacity-100"
          }`}
          disabled={linksNumber === 0 ? true : false}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default LinksPage;
