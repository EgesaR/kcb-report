"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { sql } from "@vercel/postgres";
import { Skeleton } from "@nextui-org/react";
import SkeletonLayout from "@/components/skeletonLayout";
import Onboarding from "@/components/Onboarding";

interface UserData {
  email: string;
  username: string;
  id: number;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null); // Type the state
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("loading")
      try {
        const response = await fetch("/api/getUser");
        const result = await response.json();
        console.log("This is data",result.data);
        if (response.ok) {
          setUserData(result.data); // Set user data from the response
          console.log("Done")
        } else {
          setError(result.error || "Unknown error");
        }
      } catch (err: unknown) {
        // Assert the type of err as an Error
        if (err instanceof Error) {
          setError(err.message); // Access 'message' safely
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    console.log(userData)
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check if onboarding has been shown previously
    const isOnboardingComplete = localStorage.getItem("onboardingComplete");
    if (!isOnboardingComplete) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("onboardingComplete", "true");
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <SkeletonLayout/>;
  }


  return (
    <div className="h-screen w-full bg-white px-3 pt-1 flex">
      {showOnboarding && <Onboarding />}
      <Sidebar data={userData} />
      <main className="w-full h-full">
        <Navbar data={userData} />
        <h1>User Profile</h1>
        <p>Email: {(userData as UserData).email}</p>
        <p>Username: {(userData as UserData).username}</p>
      </main>
    </div>
  );
}
