"use client";
import { useState, FormEvent } from "react";

import { Input, Link, Button } from "@nextui-org/react";
import EyeFilledIcon from "@/components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/components/icons/EyeSlashFilledIcon";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: "POST",
      body: formData
    })

    const data = await response.json()

    console.log(data)
  }
  return (
    <div className="h-screen w-full bg-black flex flex-row items-center justify-center text-white relative">
      <div className="z-40 w-full flex flex-col items-center">
        <label className="font-semibold text-2xl">
          Please Enter your Account details
        </label>
        <form className="w-[30%] mt-16 flex flex-col gap-8" onSubmit={onSubmit}>
          <Input
            type="text"
            variant={"bordered"}
            label="Email or Username"
            className="w-full placeholder-white"
            isRequired
          />
          <Input
            label="Password"
            variant="bordered"
            className="w-full placeholder-white"
            isRequired
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <div className="flex">
            <Link href="#" underline="always" className="ml-auto text-white">
              Forgot Password
            </Link>
          </div>
          <Button radius="lg" className="bg-green-700" type="submit">
            Sign In
          </Button>
        </form>
        <div className="flex w-[30%]">
          <Link href="#" underline="always" className="ml-auto text-white mt-6">
            Create Account
          </Link>
        </div>
      </div>
      <div className="w-[25rem] h-[25rem] bg-green-800 rounded-full blur-[10rem] absolute"></div>
    </div>
  );
};

export default SignInPage;
