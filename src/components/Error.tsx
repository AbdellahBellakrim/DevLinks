function Error({ message }: { message: string }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center font-semibold text-lg p-4">
      {`Error: Something went wrong! ${message}`}
    </div>
  );
}

export default Error;
