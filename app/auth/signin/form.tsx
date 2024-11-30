"use client";

import { Input, Link, Button } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import EyeFilledIcon from "@/components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/components/icons/EyeSlashFilledIcon";

const Form = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Basic validation
    if (!formData.get("username") || !formData.get("password")) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    setIsLoading(false);

    if (response?.error) {
      setErrorMessage("Invalid username or password!");
    } else {
      router.push(response?.url || "/dashboard");
      router.refresh();
    }
  };

  return (
    
    <form className="w-[30%] mt-16 flex flex-col gap-8" onSubmit={onSubmit}>
        <Input
          type="text"
          variant="underlined"
          color="default"
          label={<label className="text-black">Username</label>}
          className="w-full text-black placeholder-black"
          name="username"
          labelPlacement="outside"
          isRequired
        />
        <Input
          color="default"
          label={<label className="text-black">Password</label>}
          variant="underlined"
          className="w-full"
          name="password"
          isRequired
          labelPlacement="outside"
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
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex">
          <Link href="#" underline="always" className="ml-auto text-black">
            Forgot Password
          </Link>
        </div>
        <Button radius="lg" className="bg-green-700 w-full" type="submit" isDisabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
  );
};

export default Form;
