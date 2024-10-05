"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import Hero from "./Hero";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then((res: any) => {
          signIn("credentials", data);
          toast.success(`Welcome to DMME family, ${res.data.name}! 🙏`);
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          console.log(callback);
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }
          if (callback?.ok && !callback!.error) {
            toast.success("Logged In! Wait for few seconds 🙏");
            router.push("/users");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        console.log(callback);
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback!.error) {
          router.push("/users");
          toast.success("Logged In! Wait for few seconds 🙏");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-8 flex flex-col gap-10 sm:mx-auto sm:w-full sm:max-w-md">
      <Hero />
      <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
        <h2 className=" mb-6 text-left text-3xl font-bold tracking-tight ">
          {variant === "REGISTER"
            ? "Create an account"
            : "Sign in to your account"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={loading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Button disabled={loading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>

        <div className="mt-6 flex flex-col rounded-md border p-2 px-4 text-sm text-gray-500">
          <span className="font-bold">Test User</span>
          <span>Email: test4@gmail.com</span>
          <span>Password: 123456789</span>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t " />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "LOGIN" ? "New to DMME?" : "Already have an account?"}
          </div>
          <div
            onClick={toggleVariant}
            className="cursor-pointer underline decoration-indigo-200"
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
