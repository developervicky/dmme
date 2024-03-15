import Image from "next/image";
import AuthForm from "./components/AuthForm";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="wrapper mx-auto  my-auto flex min-h-[calc(100%-4.6rem)] flex-col py-4 sm:flex-col sm:px-6 md:flex-row  md:gap-8 lg:px-8">
      <div className="sm:mx-auto sm:my-auto sm:w-full  sm:max-w-md">
        <AuthForm />
      </div>
      <Image
        src={"/images/hero.png"}
        alt="hero"
        width={1000}
        height={1000}
        className="relative top-14 hidden md:mx-auto md:my-auto md:flex md:w-full md:min-w-[42vh] md:max-w-[86vh] md:object-cover md:object-center"
      />
    </div>
  );
}
