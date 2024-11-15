import { FaFileAlt, FaTasks, FaChartBar } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

interface UserData {
    email: string;
    username: string;
    id: number;
  }

const HomeTab = (data: UserData | any) => {
    const { username } = data.data;
    return (
      <div className="flex-1 p-6 overflow-hidden bg-gray-100">
        {/* Welcome and User Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome Back, {username}!
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-gray-600">
                <BsPersonCircle className="w-8 h-8 text-gray-800" />
              </div>
              <button className="text-blue-500">Logout</button>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Here's a quick overview of your recent activities.
          </p>
        </div>
  
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Total Reports
              </span>
              <span className="text-3xl font-bold text-blue-600">24</span>
            </div>
            <FaFileAlt className="w-12 h-12 text-blue-600" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Pending Tasks
              </span>
              <span className="text-3xl font-bold text-yellow-500">5</span>
            </div>
            <FaTasks className="w-12 h-12 text-yellow-500" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Report Insights
              </span>
              <span className="text-3xl font-bold text-green-600">78%</span>
            </div>
            <FaChartBar className="w-12 h-12 text-green-600" />
          </div>
        </div>
  
        {/* Recent Activities */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                <FaFileAlt className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold">New Report Created</p>
                <p className="text-gray-500 text-sm">
                  Created a new report on 10th November 2024
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                <FaTasks className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold">Task Completed</p>
                <p className="text-gray-500 text-sm">
                  Completed "Review Math Report" task on 8th November 2024
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                <FaChartBar className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold">
                  Report Stats Updated
                </p>
                <p className="text-gray-500 text-sm">
                  Updated stats for "Math Report" on 7th November 2024
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
            <button className="text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600">
              Create Report
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
            <button className="text-white bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600">
              View Tasks
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
            <button className="text-white bg-purple-500 px-6 py-3 rounded-lg hover:bg-purple-600">
              Report Templates
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center">
            <button className="text-white bg-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-600">
              Settings
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default HomeTab