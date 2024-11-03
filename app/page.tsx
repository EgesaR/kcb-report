import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen w-full bg-white/80 px-3 pt-4 flex">
      <Sidebar />
      <div className="w-full h-[40%]"></div>
    </div>
  );
}
