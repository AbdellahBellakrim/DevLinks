import { useReactiveVar } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import { LinkType } from "../apollo-client/types";
import LinkCard from "../components/LinkCard";
import NoLinksCard from "../components/NoLinksCard";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

// types
export interface FormFields {
  links: LinkType[];
}
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
  // states
  let User = useReactiveVar(userState);

  // React hook form + zod
  const { register, handleSubmit, control, watch } = useForm<FormFields>({
    defaultValues: {
      links: User?.links || [],
    },
  });
  const linksWatch = watch("links");
  const { append, remove, update } = useFieldArray({
    control,
    name: "links",
  });

  // functions
  // ======= handle submit =======
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("data  :", data);
  };
  // ======= handle add link =======
  const handleAddLink = () => {
    if (!User) return;
    const highestId =
      Math.max(...linksWatch.map((link: LinkType) => link.id)) + 1;
    append({ platform: "", link: "", user_id: User.id, id: highestId });
  };
  return (
    <form
      className="flex-grow max-w-[808px] bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-3xl mb-3">Customize your links</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      {/* add new link button */}
      <div
        onClick={handleAddLink}
        className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10 mb-8"
      >
        + Add new Link
      </div>
      {linksWatch.length > 0 && (
        <div className="mb-6 flex-grow border-b border-divider">
          <div className="h-[480px] overflow-y-auto no-scrollbar">
            {/* each link div : show links from links state*/}
            {linksWatch.map((link: LinkType, index: number) => {
              return (
                <LinkCard
                  key={link.id}
                  index={index}
                  link={link}
                  register={register}
                  remove={remove}
                  update={update}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* if there is no links component */}
      {User && linksWatch.length === 0 && <NoLinksCard />}
      {/* save button */}
      <div className="h-fit w-full flex items-center justify-end">
        <Button
          type="submit"
          className={`rounded-md bg-[#633CFF] text-white  w-full sm:w-auto`}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default LinksPage;
