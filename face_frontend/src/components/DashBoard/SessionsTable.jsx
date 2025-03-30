import { useEffect, useState } from "react";
import { getSessionsByTeacher } from "../../Api/Request";
import { useNavigate } from "react-router-dom";

export const SessionsTable = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    if (teacherId) {
      getSessionsByTeacher(teacherId)
        .then((response) => {
          if (response.status) {
            setSessions(response.data);
          } else {
            setError(response.data.message || "Failed to fetch sessions");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Network error, please try again later.");
          setLoading(false);
        });
    }
  }, [teacherId]);


  return (
    <div className="p-6 bg-purple-800 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-purple-700 text-center">SESSIONS</h2>

        {loading ? (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">No Course is available</p>
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
                  <tr key={session._id || `session-${index}`} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center">{session.courseName}</td>
                    <td className="p-3 text-center">{session.numStudents}</td>
                    <td className="p-3 text-center">
                      <button
                         onClick={() => navigate(`/check-attendance/${session.courseName}`)}
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
