import { Button } from "@nextui-org/react";

function LinksPage() {
  return (
    <div className="flex-grow max-w-[808px] h-full bg-white rounded-md border border-divider p-4 md:p-10 flex flex-col">
      <h1 className="font-bold text-3xl mb-3">Customize your links</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <div className="border-1 border-[#633CFF] font-medium text-sm text-[#633CFF] rounded-md  flex items-center justify-center px-4 sm:px-6 py-3 gap-1 cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10 mb-8">
        + Add new Link
      </div>
      <div className="border border-divider flex-grow mb-6">
        <p>heloo</p>
      </div>
      <div className="h-fit w-full flex items-center justify-end">
        <Button className="rounded-md bg-[#633CFF] text-white">Save</Button>
      </div>
    </div>
  );
}

export default LinksPage;
