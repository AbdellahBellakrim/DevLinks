function Mockup() {
  return (
    <div className="w-[50%] max-w-[560px] bg-white rounded-md hidden lg:flex shadow-md justify-center items-center">
      <div className="w-fit h-fit bg-white bg-opacity-5">
        <img
          className="bg-white bg-opacity-5 min-w-8 z-0"
          src="illustration-phone-mockup.svg"
          alt="illustration-phone-mockup.svg"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Mockup;
