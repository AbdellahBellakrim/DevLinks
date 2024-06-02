import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PreviewPage({ username }: { username: string }) {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen  bg-[#FAFAFA] relative">
      {/* bacground cover  */}
      <div className="absolute z-[-1] w-full h-[357px] bg-[#633CFF] rounded-b-2xl inset-0 top-0 hidden sm:block"></div>
      {/* nav */}
      <div className="absolute z-[-1] inset-0 top-0 w-full sm:w-[calc(100%-48px)] h-[78px] bg-[#FAFAFA]  sm:rounded-xl m-0 sm:m-6 p-4  flex justify-between items-center gap-4">
        {/* button */}
        <div
          onClick={() => {
            navigate("/links");
          }}
          className="w-[160px] h-full border-1 border-[#633CFF] font-semibold text-sm text-[#633CFF] rounded-md  flex items-center justify-center cursor-pointer hover:opacity-80 hover:bg-[#633CFF] hover:bg-opacity-10"
        >
          Back to Editor
        </div>
        {/* button */}
        <Button
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard
              .writeText(url)
              .then(() => {
                toast("The link has been copied to your clipboard!", {
                  position: "bottom-center",
                  duration: 2000,
                  style: {
                    width: "fit-content",
                    maxWidth: "406px",
                    padding: "16px 24px",
                    color: "#FAFAFA",
                    backgroundColor: "#333333",
                  },
                });
              })
              .catch((err) => {
                console.error("Failed to copy URL: ", err);
              });
          }}
          className="w-[160px] h-full  font-semibold text-sm  rounded-md  flex items-center justify-center dark bg-[#633CFF]"
        >
          Share Link
        </Button>
      </div>
      {/* cart */}
      <div className="absolute inset-0 w-full sm:w-[349px] h-fit sm:h-[569px] sm:rounded-2xl bg-[#FAFAFA] sm:shadow-md mt-[78px] sm:mt-52 mb-6 mx-auto py-12 px-14 sm:overflow-auto sm:scrollbar-hide"></div>
    </div>
  );
}

export default PreviewPage;
