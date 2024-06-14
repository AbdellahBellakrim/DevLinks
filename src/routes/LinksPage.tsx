import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Button } from "@nextui-org/react";
import { userState } from "../apollo-client/apollo-client";
import LinkCard from "../components/LinkCard";
import NoLinksCard from "../components/NoLinksCard";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  DELETE_DEVLINKS_LINKS,
  UPSERT_ONE_LINK,
} from "../apollo-client/mutations";
import { GET_USER_BY_ID } from "../apollo-client/queries";
import { LinkType } from "../apollo-client/types";

const schema = z.object({
  links: z
    .array(
      z.object({
        id: z.number().optional(),
        link: z.string().min(1, "Can't be empty").url("Invalid URL"),
        platform: z.string().min(1, "Can't be empty"),
        user_id: z.number(),
      })
    )
    .refine(
      (links) => {
        const platforms = links.map((link) => link.platform);
        const uniquePlatforms = new Set(platforms);
        return platforms.length === uniquePlatforms.size;
      },
      {
        message: "One Link per platform is allowed",
        path: [],
      }
    ),
});

export type FormFields = z.infer<typeof schema>;

function LinksPage() {
  const User = useReactiveVar(userState);
  const { refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: User?.id },
  });
  const [upsertLinks] = useMutation(UPSERT_ONE_LINK, {
    refetchQueries: [GET_USER_BY_ID],
    awaitRefetchQueries: true,
  });
  const [deleteLinks] = useMutation(DELETE_DEVLINKS_LINKS, {
    refetchQueries: [GET_USER_BY_ID],
    awaitRefetchQueries: true,
  });

  const { handleSubmit, control, formState, reset } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      links: User?.links || [],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "links",
  });

  useEffect(() => {
    formState.errors.links?.root?.message &&
      toast(formState.errors.links?.root?.message, {
        position: "bottom-center",
        duration: 2000,
        style: {
          width: "fit-content",
          maxWidth: "406px",
          padding: "16px 24px",
          color: "#FAFAFA",
          backgroundColor: "red",
        },
      });
  }, [formState.errors]);

  useEffect(() => {
    const ResetingData = async () => {
      const { data: newData } = await refetch();
      if (newData) {
        reset(
          {
            links: [
              ...newData.devlinks_user_by_pk.links.map(
                ({
                  id,
                  link,
                  platform,
                  user_id,
                }: {
                  id: number;
                  link: string;
                  platform: string;
                  user_id: number;
                }) => ({ id, link, platform, user_id })
              ),
            ].sort((a, b) => a.id - b.id),
          },
          {
            keepDirty: false,
            keepDirtyValues: false,
          }
        );
      }
    };
    if (User && formState.isDirty) {
      ResetingData();
    }
  }, [formState.isSubmitted]);

  // ======= handle submit =======
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!User) return;
    if (!formState.isDirty) {
      toast.error("No changes detected", {
        position: "bottom-center",
        duration: 2000,
        style: {
          width: "fit-content",
          maxWidth: "406px",
          padding: "16px 24px",
          color: "#FAFAFA",
          backgroundColor: "red",
        },
      });
      return;
    }

    const initialLinks = new Set(User.links.map((link) => link.id));
    const currentLinks = new Set(data.links.map((link) => link.id));

    const removedLinks = [...initialLinks].filter(
      (id) => !currentLinks.has(id)
    );
    const upsertedLinks = data.links.filter(
      (link) =>
        !initialLinks.has(link.id) ||
        (initialLinks.has(link.id) &&
          !User.links.find(
            (u) =>
              u.id === link.id &&
              u.link === link.link &&
              u.platform === link.platform
          ))
    );

    try {
      if (removedLinks.length > 0) {
        const Ids: number[] = removedLinks.map((id) => id as number);
        await deleteLinks({ variables: { ids: Ids } });
      }
      if (upsertedLinks.length > 0) {
        const variables = {
          objects: upsertedLinks.map((link) => ({
            id: link.id,
            link: link.link,
            platform: link.platform,
            user_id: User.id,
          })),
        };
        await upsertLinks({ variables });
      }

      toast.success("Links saved successfully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          width: "fit-content",
          maxWidth: "406px",
          padding: "16px 24px",
          color: "#FAFAFA",
          backgroundColor: "green",
        },
      });
    } catch (error) {
      toast.error("An error occurred while saving links", {
        position: "bottom-center",
        duration: 2000,
        style: {
          width: "fit-content",
          maxWidth: "406px",
          padding: "16px 24px",
          color: "#FAFAFA",
          backgroundColor: "red",
        },
      });
    }
  };
  // ======= handle add link =======
  const handleAddLink = () => {
    if (!User) return;
    append({ platform: "", link: "", user_id: User.id });
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
      {fields.length > 0 && (
        <div className="mb-6 flex-grow border-b border-divider">
          <div className="h-[480px] overflow-y-auto no-scrollbar">
            {/* each link div : show links from links state*/}
            {fields.map((field: LinkType, index: number) => {
              return (
                <LinkCard
                  control={control}
                  key={field.id}
                  formState={formState}
                  index={index}
                  remove={remove}
                  link={field}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* if there is no links component */}
      {User && fields.length === 0 && <NoLinksCard />}
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
