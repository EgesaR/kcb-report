"use client";

import { Input, Link, Button } from "@nextui-org/react";
import EyeFilledIcon from "@/components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@/components/icons/EyeSlashFilledIcon";
import { useState } from "react";

export default function Form() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sign up.");
      }

      console.log("Signup success:", result.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-[30%] mt-16 flex flex-col gap-8"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        variant="underlined"
        label="Username"
        className="w-full placeholder-white"
        name="username"
        isRequired
      />
      <Input
        type="email"
        variant="underlined"
        label="Email"
        className="w-full placeholder-white"
        name="email"
        isRequired
      />
      <Input
        label="Password"
        variant="underlined"
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
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex">
        <Link href="#" underline="always" className="ml-auto text-white">
          Forgot Password
        </Link>
      </div>
      <Button
        radius="lg"
        className="bg-green-700"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing up..." : "Create Account"}
      </Button>
    </form>
  );
}
