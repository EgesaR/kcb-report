import { Link } from "@nextui-org/react";
import Form from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession()

  if (session) {
    redirect("/")
  }
  return (
    <div className="h-screen w-full bg-black flex flex-row items-center justify-center text-white relative">
      <div className="z-40 w-full flex flex-col items-center">
        <label className="font-semibold text-2xl">
          Please Enter your Account details
        </label>
        <Form />
        <div className="flex w-[30%]">
          <Link href="/auth/signup" underline="always" className="ml-auto text-white mt-6">
            Create Account
          </Link>
        </div>
      </div>
      <div className="w-[25rem] h-[25rem] bg-green-800 rounded-full blur-[10rem] absolute"></div>
    </div>
  );
};

export default SignInPage;
