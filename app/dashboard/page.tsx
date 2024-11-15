"use client"

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SkeletonLayout from "@/components/skeletonLayout";
import Onboarding from "@/components/Onboarding";
import HomeTab from "@/components/tabs/Home";

interface UserData {
  email: string;
  username: string;
  id: number;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  // Function to change the active tab
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getUser");
        const result = await response.json();
        if (response.ok) {
          setUserData(result.data); // Set user data from the response
        } else {
          setError(result.error || "Unknown error");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOnboardingComplete = localStorage.getItem("onboardingComplete");
      if (!isOnboardingComplete) {
        setShowOnboarding(true);
      }
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
    return <SkeletonLayout />;
  }

  return (
    <div className="h-screen w-full bg-white px-3 pt-1 flex">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      <Sidebar data={userData} handleTabChange={handleTabChange} activeTab={activeTab} />
      

      <div className="w-3/4 p-6">
        {activeTab === 1 && <HomeTab data={userData}/>}
        {activeTab === 2 && <TabContent2 />}
        {activeTab === 3 && <TabContent3 />}
      </div>
    </div>
  );
}

const TabContent1 = (data: UserData | any) => (
  <HomeTab data={data}/>
);

const TabContent2 = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold">Tab 2 Content</h2>
    <p>This is the content for Tab 2.</p>
  </div>
);

const TabContent3 = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold">Tab 3 Content</h2>
    <p>This is the content for Tab 3.</p>
  </div>
);
