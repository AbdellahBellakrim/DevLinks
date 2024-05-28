import { Button } from "@nextui-org/react";
import { useState } from "react";

function LinksPage() {
  const [links, setLinks] = useState<number>(0);
  return (
    <div className="flex-grow max-w-[808px] h-full bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md overflow-y-auto">
      <h1 className="font-bold text-3xl mb-3">Customize your links</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <div
        onClick={() => setLinks(links + 1)}
        className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10 mb-8"
      >
        + Add new Link
      </div>
      {/* each link div */}
      {links > 0 && (
        <div className="flex-grow mb-6 overflow-y-auto border-b border-divider no-scrollbar min-h-[228px]">
          <div className="w-full h-[228px] bg-[#FAFAFA] border border-divider shadow-md">
            {links}
          </div>
        </div>
      )}
      {links === 0 && (
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
      <div className="h-fit w-full flex items-center justify-end">
        <Button
          className={`rounded-md bg-[#633CFF] text-white ${
            links === 0 ? "opacity-40" : "opacity-100"
          }`}
          disabled={links === 0 ? true : false}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default LinksPage;
