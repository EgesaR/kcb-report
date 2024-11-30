"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <Link href="/dashboard">Dashboards</Link>
        <button onClick={() => signOut()} className="text-red-800">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex ml-auto">
      <button onClick={() => signIn()} className="text-green-800 mr-4">
        Sign In
      </button> 
      <label onClick={() => signIn()}></label>
      <Link href="/auth/signup">SignUp</Link>
    </div>
  );
};

export default SignInButton;
