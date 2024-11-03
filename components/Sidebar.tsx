import { IoIosArrowDropleft, IoMdStats } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import { MdOutlineHeadsetMic } from "react-icons/md";

const Sidebar = () => {
  return (
    <aside className="h-full w-[22%] relative border-r-1 border-slate-400 pr-3">
      <div className="flex items-center">
        <h1 className="font-bold text-lg">Kiira College Butiki</h1>
        <IoIosArrowDropleft className="ml-auto " fontSize={20} />
      </div>
      <div className="mt-6">
        <label className="text-sm text-gray-600">MAIN</label>
        <button className="flex gap-4 mb-2 bg-green-200 text-green-800 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900">
          <GoHome fontSize={20} />
          <label>Dashboard</label>
        </button>
        <button className="flex gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900">
          <IoMdStats fontSize={20} />
          <label>Report</label>
        </button>
        <button className="flex gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900">
          <FiUsers fontSize={20} />
          <label>Department</label>
        </button>
      </div>
      <div className="absolute bottom-5">
        <button className="flex gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900">
          <RiSettings3Line fontSize={20} />
          <label>Settings</label>
        </button>
        <button className="flex gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900">
          <MdOutlineHeadsetMic fontSize={20} />
          <label>Feedback</label>
        </button>

        <div className="w-full flex items-center justify-center">
                  <button className="flex flex-row w-[85%]">
                      
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
