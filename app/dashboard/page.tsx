"use client"

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getUser");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full bg-white/80 px-3 pt-1 flex">
      <Sidebar />
      <main className="w-full h-full">
        <Navbar />
        <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>
      </main>
    </div>
  );
}
