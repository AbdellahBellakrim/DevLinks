import { useMutation, useReactiveVar } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import { LinkType } from "../apollo-client/types";
import LinkCard from "../components/LinkCard";
import NoLinksCard from "../components/NoLinksCard";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// import { UPSERT_ONE_LINK } from "../apollo-client/mutations";
// import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  links: z.array(
    z.object({
      id: z.number(),
      link: z.string().min(1),
      platform: z.string().min(1),
      user_id: z.number(),
    })
  ),
});

// types
export type FormFields = z.infer<typeof schema>;

function LinksPage() {
  let User = useReactiveVar(userState);
  // const [upsertOneLink] = useMutation(UPSERT_ONE_LINK);
  // const [upsertedLinks, setUpsertedLinks] = useState<LinkType[]>([]);
  // const [removedLinks, setRemovedLinks] = useState<LinkType[]>([]);

  // React hook form + zod
  const { register, handleSubmit, control, watch, formState } =
    useForm<FormFields>({
      resolver: zodResolver(schema),
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
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    if (!User) return;
    console.log("data  :", data);
    // const variables = {
    //   objects: [
    //     {
    //       link: "done22",
    //       platform: "te",
    //       user_id: User.id,
    //     },
    //   ],
    // };

    // upsertOneLink({ variables });
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
                  formState={formState}
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
          disabled={formState.isSubmitting}
          type="submit"
          className={`rounded-md bg-[#633CFF] text-white  w-full sm:w-auto`}
        >
          {formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default LinksPage;
