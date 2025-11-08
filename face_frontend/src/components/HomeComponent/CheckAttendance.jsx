// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAttendanceByCourse } from "../../Api/Request";

// export const CheckAttendance = () => {
//   const [attendance, setAttendance] = useState([]); // ✅ Fixed state variable name
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { courseName } = useParams();
//   const navigate = useNavigate();
//   const teacherId = localStorage.getItem("teacherId");

//   useEffect(() => {
//     if (teacherId) {
//       getAttendanceByCourse(teacherId, courseName)
//         .then((response) => {
//           if (response.status) {
//             setAttendance(response.data);
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
//   }, [teacherId, courseName]);

//   return (
//     <div className="p-6 bg-purple-900 min-h-screen flex justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
//         <h2 className="text-3xl font-bold text-purple-700 text-center mb-4">
//           Attendance List for {courseName.toUpperCase()}
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-600 mt-4">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-600 mt-4">{error}</p>
//         ) : attendance.length === 0 ? (
//           <p className="text-center text-gray-600 mt-4">
//             No Attendance Records Available
//           </p>
//         ) : (
//           <div className="overflow-x-auto mt-4">
//             <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
//               <thead>
//                 <tr className="bg-purple-600 text-white text-center">
//                   <th className="p-3">S No.</th>
//                   <th className="p-3">Date</th>
//                   <th className="p-3">Time</th>
//                   <th className="p-3">Present</th>
//                   <th className="p-3">Absent</th>
//                   <th className="p-3">Total</th>
//                   <th className="p-3">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {attendance.map((session, index) => {
//                   const {date, present, absent, totalStudents } =session;
//                   const parsedDate = new Date(date); // ✅ Ensure proper parsing
//                   const formattedDate = parsedDate.toLocaleDateString();
//                   const formattedTime = parsedDate.toLocaleTimeString();

//                   return (
//                     <tr
//                       key={session._id || `attendance-${index}`}
//                       className="border-b hover:bg-gray-100 text-center"
//                     >
//                       <td className="p-3">{index + 1}</td>
//                       <td className="p-3">{formattedDate}</td>
//                       <td className="p-3">{formattedTime}</td>
//                       <td className="p-3">{present}</td>
//                       <td className="p-3">{absent}</td>
//                       <td className="p-3">{totalStudents}</td>
//                       <td className="p-3">
//                         <button
//                           onClick={() =>navigate(
//                             `/attendancePerDate/${courseName}/${encodeURIComponent(formattedDate)}/${encodeURIComponent(formattedTime)}`) 
//                           }
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           {console.log(
//       `Fetching attendance for Course: ${courseName}, Date: ${formattedDate}, Time: ${formattedTime}, Teacher ID: ${teacherId}`)}
//                           Details
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAttendanceByCourse } from "../../Api/Request";

export const CheckAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { courseName } = useParams();
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    if (teacherId) {
      getAttendanceByCourse(teacherId, courseName)
        .then((response) => {
          if (response.status) {
            setAttendance(response.data);
          } else {
            setError(response.data.message || "Failed to fetch attendance records");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Network error, please try again later.");
          setLoading(false);
        });
    }
  }, [teacherId, courseName]);

  return (
    <div className="relative flex justify-center p-7 min-h-screen w-full bg-[#1E293B] text-white">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover bg-center opacity-15 blur-md"></div>

      {/* Content Wrapper */}
      <div className="relative bg-[#334155] bg-opacity-95 p-8 rounded-lg shadow-2xl w-full max-w-5xl backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-[#06B6D4]">
          📝 Attendance for {courseName?.toUpperCase()}
        </h2>

        {/* Loading & Error Messages */}
        {loading ? (
          <p className="text-center text-gray-300 mt-4 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400 mt-4">{error}</p>
        ) : attendance.length === 0 ? (
          <p className="text-center text-gray-300 mt-4">No Attendance Records Available</p>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-white border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#2563EB] text-white">
                  <th className="p-4 text-left">S No.</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-center">Time</th>
                  <th className="p-4 text-center">Present</th>
                  <th className="p-4 text-center">Absent</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((session, index) => {
                  const { date, present, absent, totalStudents } = session;
                  const parsedDate = new Date(date);
                  const formattedDate = parsedDate.toLocaleDateString();
                  const formattedTime = parsedDate.toLocaleTimeString();

                  return (
                    <tr
                      key={session._id || `attendance-${index}`}
                      className="border-b border-gray-600 bg-[#2D3748] transition duration-300 hover:bg-[#4A5568] hover:opacity-80 text-center"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{formattedDate}</td>
                      <td className="p-4">{formattedTime}</td>
                      <td className="p-4">{present}</td>
                      <td className="p-4">{absent}</td>
                      <td className="p-4">{totalStudents}</td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/attendancePerDate/${courseName}/${encodeURIComponent(
                                formattedDate
                              )}/${encodeURIComponent(formattedTime)}`
                            )
                          }
                          className="text-[#E2E8F0] hover:text-[#06B6D4] transition duration-200"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
