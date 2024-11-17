import { useState, useEffect } from "react";

interface StudentRecord {
  id: number;
  name: string;
  marks: Record<string, number | null>; // Example: { Physics: 85, Chemistry: null, Math: null }
}

const ReportTab = ({ subject }: { subject: string }) => {
  const [data, setData] = useState<StudentRecord[]>([]);
  const [updatedMarks, setUpdatedMarks] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use subject in the URL path
      const response = await fetch(`/api/teacher-marks/${subject}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const records = await response.json();
      const studentsData: StudentRecord[] = records.students.map(
        (student: any) => ({
          ...student,
          marks: student.marks || {}, // Ensure `marks` is always an object
        })
      );

      setData(studentsData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update marks via API
  const updateMarks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/teacher-marks/${subject}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          updatedMarks,
        }),
      });
      if (!response.ok) throw new Error("Failed to update marks");

      // Update local data without re-fetching
      setData((prevData) =>
        prevData.map((record) => ({
          ...record,
          marks: {
            ...record.marks,
            [subject]: updatedMarks[record.id] ?? record.marks[subject],
          },
        }))
      );
      setUpdatedMarks({});
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [subject]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex w-full items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          {subject} Marks Entry
        </h1>
        <button
          onClick={updateMarks}
          className="ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Save Marks
        </button>
      </div>
      {isLoading && <p className="text-blue-500 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!isLoading && !error && (
        <>
          <div className="overflow-x-auto block overflow-y-auto h-[85vh] pb-11">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100 sticky">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Student Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">
                    Mark
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((record) => (
                  <tr key={record.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">{record.name}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={
                          updatedMarks[record.id] ??
                          record.marks?.[subject] ??
                          "" // Safely access `marks[subject]`
                        }
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 100) {
                            setUpdatedMarks({
                              ...updatedMarks,
                              [record.id]: value,
                            });
                          }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportTab;
