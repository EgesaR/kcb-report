"use client";

import { useState } from "react";
import { IoIosArrowDropleft, IoMdStats } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import User from "@/app/dashboard/userInfo";

const Sidebar = () => {
  const [minimize, setMinimize] = useState(false);
  const handleMinimize = () => {
    console.log(minimize);
    if (minimize === true) {
      setMinimize(false);
    } else {
      setMinimize(true);
    }
  }
  const user = async () => {
    const response = await fetch("/api/getUser", {
      method: "GET",
      body: JSON.stringify({}),
    });
    return user 
  }
  console.log(user())
  return (
    <aside
      className={`h-full ease-in-out duration-300 ${
        minimize ? "w-[5%]" : "w-[24%]"
      } relative border-r-1 border-slate-400 pr-3 overflow-hidden`}
    >
      <div
        className={`flex items-center ${minimize ? "flex-col" : "flex-row"}`}
      >
        <h1 className="font-bold text-[10px] sm:text-lg">
          {minimize ? "KCB" : "Kiira College Butiki"}
        </h1>
        <button onClick={() => handleMinimize()}>
          <IoIosArrowDropleft
            className={`ml-auto hover:bg-green-300 text-green-900 rounded-full w-8 h-8 p-1 
            ${minimize ? "rotate-180" : "rotate-0"}`}
            fontSize={20}
          />
        </button>
      </div>
      <div className="mt-6">
        {minimize ? "" : <label className="text-sm text-gray-600">MAIN</label>}
        <button
          className={`flex ${
            minimize ? "justify-center transition ease" : ""
          } gap-4 mb-2 bg-green-200 text-green-800 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900`}
        >
          <GoHome fontSize={20} />
          {minimize ? "" : <label>Dashboard</label>}
        </button>
        <button
          className={`flex ${
            minimize ? "justify-center transition ease" : ""
          } gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900`}
        >
          <IoMdStats fontSize={20} />
          {minimize ? "" : <label>Report</label>}
        </button>
        <button
          className={`flex ${
            minimize ? "justify-center transition ease" : ""
          } gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900`}
        >
          <FiUsers fontSize={20} />
          {minimize ? "" : <label>Department</label>}
        </button>
      </div>
      <div
        className={`absolute bottom-5 ${
          minimize
            ? "w-[80%] ease-in-out duration-300"
            : "w-full ease-linear duration-300"
        } flex items-center flex-col justify-center`}
      >
        <button
          className={`flex ${
            minimize ? "justify-center transition ease" : ""
          } gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900`}
        >
          <RiSettings3Line fontSize={20} />
          {minimize ? "" : <label>Settings</label>}
        </button>
        <button
          className={`flex ${
            minimize ? "justify-center transition ease" : ""
          } gap-4 mb-2 text-slate-600 w-full py-2 rounded-lg px-2 items-center hover:bg-green-300 hover:text-green-900`}
        >
          <MdOutlineHeadsetMic fontSize={20} />
          {minimize ? "" : <label>Feedback</label>}
        </button>

        <div className="w-full flex items-center justify-center border-t-1 border-slate-500 pt-6">
          <button className={`flex flex-row w-[100%] gap-2 ${minimize ? "justify-center" : ""}`}>
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              size="sm"
            />
            {minimize ? (
              ""
            ) : (
              <div className="text-[12px] text-left">
                <div>Ochepa Elisha</div>
                  <div>ochepaelisga@gmail.com</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
