"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

const AdminPage = () => {
  const [userData, setUserData] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getAllUsers");
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setUserData(result.users); // Update this line to match your response structure
        } else {
          setError(
            result.error || "Unknown error occurred while fetching users."
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (error) {
    return <p className="text-red-500 font-bold">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">KCB Admin Panel 2024</h1>
      </nav>

      <main className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg bg-white mt-4">
            <table className="w-full border-collapse">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`transition-all duration-200 ease-in-out ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-100 transform hover:scale-[1.01]`}
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className="fixed bottom-2  -left-5 w-full h-8 flex justify-center iitems-center text-slate-700 text-lg">
        <label>&copy; Science And Technology@2024</label>
      </footer>
    </div>
  );
};

export default AdminPage;
