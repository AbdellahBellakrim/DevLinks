import { useReactiveVar } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import { platforms } from "../apollo-client/apollo-client";
import toast from "react-hot-toast";
import { LinkType } from "../apollo-client/types";
import { useEffect, useState } from "react";
import LinkCard from "../components/LinkCard";

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
  const [links, setLinks] = useState<LinkType[]>([]);
  const User = useReactiveVar(userState);

  useEffect(() => {
    if (User) {
      setLinks(User.links);
    }
  }, [User]);

  useEffect(() => {
    console.log(links);
  }, [links]);

  const validateLinks = (): boolean => {
    const linkSet = new Set();
    for (const link of links || []) {
      if (!platforms.includes(link.platform)) {
        toast("Platform is not valid!", {
          position: "top-center",
          duration: 2000,
          style: {
            width: "fit-content",
            maxWidth: "406px",
            padding: "16px 24px",
            color: "#FAFAFA",
            backgroundColor: "red",
          },
        });
        return false;
      }
      if (linkSet.has(link.platform)) {
        toast("You have double links with one platform!", {
          position: "top-center",
          duration: 2000,
          style: {
            width: "fit-content",
            maxWidth: "406px",
            padding: "16px 24px",
            color: "#FAFAFA",
            backgroundColor: "red",
          },
        });
        return false;
      }
      linkSet.add(link.platform);
    }
    return true;
  };

  const handleButtonClick = () => {
    if (validateLinks()) {
      // Proceed with saving data...
      toast("Links successfully updated!", {
        position: "top-center",
        duration: 2000,
        style: {
          width: "fit-content",
          maxWidth: "406px",
          padding: "16px 24px",
          color: "#FAFAFA",
          backgroundColor: "green",
        },
      });
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
        onClick={() => {
          if (!User) return;
          const highestId = Math.max(...links.map((link) => link.id)) + 1;
          setLinks([
            ...links,
            {
              id: highestId,
              platform: "",
              link: "",
              user_id: User.id,
            },
          ]);
        }}
        className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10 mb-8"
      >
        + Add new Link
      </div>
      {links.length > 0 && (
        <div className="mb-6 flex-grow border-b border-divider">
          <div className="h-[480px] overflow-y-auto no-scrollbar">
            {/* each link div : show links from cloud*/}
            {links.map((link: LinkType, index: number) => {
              return (
                <LinkCard
                  key={link.id}
                  link={link}
                  index={index}
                  links={links}
                  setLinks={setLinks}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* if there is no links component */}
      {User && links.length === 0 && (
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
          onClick={handleButtonClick}
          className={`rounded-md bg-[#633CFF] text-white  w-full sm:w-auto`}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default LinksPage;
