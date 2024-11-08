"use client";

import { Input, Link, Button } from "@nextui-org/react";
import EyeFilledIcon from "@/components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/components/icons/EyeSlashFilledIcon";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const Form = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
      signIn('credentials', {
          username: formData.get("username"),
          password: formData.get("password"),
          redirect: false
    })
  };

  return (
    <form className="w-[30%] mt-16 flex flex-col gap-8" onSubmit={onSubmit}>
      <Input
        type="text"
        variant={"bordered"}
        label="Email or Username"
        className="w-full placeholder-white"
        name="username"
        isRequired
      />
      <Input
        label="Password"
        variant="bordered"
        className="w-full placeholder-white"
        name="password"
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
  );
};

export default Form;
