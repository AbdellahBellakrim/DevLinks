function NoLinksCard() {
  return (
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
  );
}

export default NoLinksCard;
