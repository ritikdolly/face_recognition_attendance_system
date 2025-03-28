import { useEffect, useState } from "react";
import axios from "axios";

export const SessionsTable = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/attendance/sessions?teacherId=${teacherId}`)
      .then((response) => {
        setSessions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setError("Failed to fetch sessions");
        setLoading(false);
      });
  }, [teacherId]);

  const handleEdit = (id) => {
    console.log("Edit session", id);
  };

  return (
    <div className="p-6 bg-purple-800 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-purple-700 text-center">SESSIONS</h2>

        {loading ? (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">No sessions available</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="p-3">S No.</th>
                  <th className="p-3">COURSE</th>
                  <th className="p-3">NO. OF STUDENTS</th>
                  <th className="p-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={session._id} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center">{session.courseName}</td>
                    <td className="p-3 text-center">{session.numStudents}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleEdit(session._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
