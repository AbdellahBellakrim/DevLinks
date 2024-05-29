import { Button } from "@nextui-org/react";

function ProfilePage() {
  return (
    <div className="flex-grow max-w-[808px] bg-white rounded-md p-4 md:p-10 flex flex-col shadow-md">
      <h1 className="font-bold text-3xl mb-3">Profile Details</h1>
      <p className="font-normal text-sm text-[#737373] mb-8">
        Add your details to create a personal touch to your profile.
      </p>
      <div className="flex-grow  mb-6 border-b border-divider">
        <div className="min-h-[233px] rounded-xl bg-black bg-opacity-5  mb-6 p-5"></div>
        <div className="min-h-[208px] rounded-xl bg-black bg-opacity-5 p-5"></div>
      </div>
      {/* save button */}
      <div className="h-fit w-full flex items-center justify-end">
        <Button className={`rounded-md bg-[#633CFF] text-white`}>Save</Button>
      </div>
    </div>
  );
}

export default ProfilePage;

// ${linksNumber === 0 ? "opacity-40" : "opacity-100"}
