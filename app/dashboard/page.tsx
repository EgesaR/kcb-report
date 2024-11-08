import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  return (
    <div className="h-screen w-full bg-white/80 px-3 pt-1 flex">
      <Sidebar />
      <main className="w-full h-full">
        <Navbar />
      </main>
    </div>
  );
}
