// import { useEffect, useState } from "react";
// import { getSessionsByTeacher } from "../../Api/Request";
// import { useNavigate } from "react-router-dom";

// export const SessionsTable = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const teacherId = localStorage.getItem("teacherId");

//   useEffect(() => {
//     if (teacherId) {
//       getSessionsByTeacher(teacherId)
//         .then((response) => {
//           if (response.status) {
//             setSessions(response.data);
//           } else {
//             setError(response.data.message || "Failed to fetch sessions");
//           }
//           setLoading(false);
//         })
//         .catch(() => {
//           setError("Network error, please try again later.");
//           setLoading(false);
//         });
//     }
//   }, [teacherId]);


//   return (
//     <div className="p-6 bg-purple-800 min-h-screen flex justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
//         <h2 className="text-2xl font-bold text-purple-700 text-center">SESSIONS</h2>

//         {loading ? (
//           <p className="text-center text-gray-600 mt-4">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-600 mt-4">{error}</p>
//         ) : sessions.length === 0 ? (
//           <p className="text-center text-gray-600 mt-4">No Course is available</p>
//         ) : (
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr className="bg-purple-600 text-white">
//                   <th className="p-3">S No.</th>
//                   <th className="p-3">COURSE</th>
//                   <th className="p-3">NO. OF STUDENTS</th>
//                   <th className="p-3">ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sessions.map((session, index) => (
//                   <tr key={session._id || `session-${index}`} className="border-b hover:bg-gray-100">
//                     <td className="p-3 text-center">{index + 1}</td>
//                     <td className="p-3 text-center">{session.courseName}</td>
//                     <td className="p-3 text-center">{session.numStudents}</td>
//                     <td className="p-3 text-center">
//                       <button
//                          onClick={() => navigate(`/check-attendance/${session.courseName}`)}
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


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
    <div className="relative flex justify-center p-7 min-h-screen w-full bg-[#1E293B] text-white">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>

      {/* Content Wrapper */}
      <div className="relative bg-[#334155] bg-opacity-95 p-8 rounded-lg shadow-2xl w-full max-w-5xl backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-[#06B6D4] flex items-center justify-center gap-2">
          📅 Face Recognition Sessions
        </h2>

        {/* Loading & Error Messages */}
        {loading ? (
          <p className="text-center text-gray-300 mt-4 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400 mt-4">{error}</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-300 mt-4">No Sessions Available</p>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-white border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#2563EB] text-white">
                  <th className="p-4 text-left">S No.</th>
                  <th className="p-4 text-left">Course</th>
                  <th className="p-4 text-center">No. of Students</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr
                    key={session._id || `session-${index}`}
                    className="border-b border-gray-600 hover:bg-[#4A5568] transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{session.courseName}</td>
                    <td className="p-4 text-center">{session.numStudents}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => navigate(`/check-attendance/${session.courseName}`)}
                        className="text-[#06B6D4] hover:underline transition"
                      >
                        View Attendance
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
