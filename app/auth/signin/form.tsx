"use client";

import { Input, Link, Button } from "@nextui-org/react";
import EyeFilledIcon from "@/components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/components/icons/EyeSlashFilledIcon";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

//import "react-toastify/dist/ReactToastify.css";
import "react-toastify/ReactToastify.css";

const Form = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });

    if (response?.error) {
      console.log(response.error);
      notify("Wrong Username or Password", "error");
      console.log("Truly you got an errors");
    }
    if (!response?.error) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const notify = (message: any, type: string) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (type === "error") {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <form className="w-[30%] mt-16 flex flex-col gap-8" onSubmit={onSubmit}>
      <Input
        type="text"
        variant={"underlined"}
        color={"default"}
        label="Email or Username"
        className="w-full placeholder-white text-white"
        name="username"
        isRequired
      />
      <Input
        color={"default"}
        label="Password"
        variant="underlined"
        className="w-full placeholder-white text-white"
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
      <Button radius="lg" className="bg-green-700 w-full" type="submit">
        Sign In
      </Button>
      <div>
        <ToastContainer />
      </div>
    </form>
  );
};

export default Form;
