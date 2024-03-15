import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={"/images/logo.svg"}
          alt="logo"
          width={70}
          height={70}
          className="mx-auto flex h-12 w-12"
        />
        <h1 className="-mt-2 text-2xl font-bold">DMME</h1>
      </div>
      <p className=" w-full max-w-md px-3 text-center text-[17px] text-gray-600">
        DMME, the end to end messenger service with maximum privacy unlike other
        existing applications.
      </p>
    </div>
  );
};

export default Hero;
