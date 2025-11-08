

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPresentAndAbsentListPreDate } from "../../Api/Request";

// export const AttendanceListOfEachDate = () => {
//   const { courseName, date, time } = useParams(); // Get params from URL
//   const teacherId = localStorage.getItem("teacherId");

//   const [attendanceDetails, setAttendanceDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!teacherId || !courseName || !date || !time) {
//       setError("Missing parameters");
//       setLoading(false);
//       return;
//     }
//     getPresentAndAbsentListPreDate(
//       teacherId,
//       courseName,
//       date,
//       time
//     )
//     .then((response) => {
//       if (response.status) {
//         setAttendanceDetails(response.data);
//       } else {
//         setError(response.data.message || "Failed to fetch sessions");
//       }
//       setLoading(false);
//     })
//     .catch(() => {
//       setError("Network error, please try again later.");
//       setLoading(false);
//     });
//   }, [teacherId, courseName, date, time]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center ">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
//           Attendance Details
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-600">{error}</p>
//         ) : (
//           <>
//             <p className="text-center text-lg text-gray-700">
//               <span className="font-semibold">Course:</span> {courseName}
//             </p>
//             <p className="text-center text-lg text-gray-700">
//               <span className="font-semibold">Date:</span> {date}
//             </p>
//             <p className="text-center text-lg text-gray-700">
//               <span className="font-semibold">Time:</span> {time}
//             </p>

//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-green-600">Present</h3>
//               {attendanceDetails.present.length > 0 ? (
//                 <ul className="mt-2 bg-green-100 p-3 rounded-md shadow-md">
//                   {attendanceDetails.present.map((student, index) => (
//                     <li
//                       key={index}
//                       className="border-b last:border-none p-2 text-gray-800"
//                     >
//                       {student}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600 mt-2">No students present</p>
//               )}
//             </div>

//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-red-600">Absent</h3>
//               {attendanceDetails.absent.length > 0 ? (
//                 <ul className="mt-2 bg-red-100 p-3 rounded-md shadow-md">
//                   {attendanceDetails.absent.map((student, index) => (
//                     <li
//                       key={index}
//                       className="border-b last:border-none p-2 text-gray-800"
//                     >
//                       {student}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600 mt-2">No students absent</p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPresentAndAbsentListPreDate } from "../../Api/Request";

export const AttendanceListOfEachDate = () => {
  const { courseName, date, time } = useParams();
  const teacherId = localStorage.getItem("teacherId");

  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teacherId || !courseName || !date || !time) {
      setError("Missing parameters");
      setLoading(false);
      return;
    }
    getPresentAndAbsentListPreDate(teacherId, courseName, date, time)
      .then((response) => {
        if (response.status) {
          setAttendanceDetails(response.data);
        } else {
          setError(response.data.message || "Failed to fetch sessions");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error, please try again later.");
        setLoading(false);
      });
  }, [teacherId, courseName, date, time]);

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-[#1E293B] text-white">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover bg-center opacity-10 blur-md"></div>

      {/* Content Box */}
      <div className="relative bg-[#334155] bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-3xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-[#06B6D4]">
          🎭 Attendance Details
        </h2>

        {/* Loading & Error Messages */}
        {loading ? (
          <p className="text-center text-gray-300 mt-4 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-300 mt-4">{error}</p>
        ) : (
          <>
            <p className="text-center text-lg text-gray-300 mt-4">
              <span className="font-semibold text-[#06B6D4]">Course:</span> {courseName}
            </p>
            <p className="text-center text-lg text-gray-300">
              <span className="font-semibold text-[#06B6D4]">Date:</span> {date}
            </p>
            <p className="text-center text-lg text-gray-300">
              <span className="font-semibold text-[#06B6D4]">Time:</span> {time}
            </p>

            {/* Present Students List */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-green-300">✅ Present</h3>
              {attendanceDetails.present.length > 0 ? (
                <ul className="mt-2 bg-green-200 bg-opacity-20 p-4 rounded-md shadow-md text-gray-900">
                  {attendanceDetails.present.map((student, index) => (
                    <li key={index} className="border-b last:border-none p-3">
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 mt-2">No students present</p>
              )}
            </div>

            {/* Absent Students List */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-red-300">❌ Absent</h3>
              {attendanceDetails.absent.length > 0 ? (
                <ul className="mt-2 bg-red-200 bg-opacity-20 p-4 rounded-md shadow-md text-gray-900">
                  {attendanceDetails.absent.map((student, index) => (
                    <li key={index} className="border-b last:border-none p-3">
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 mt-2">No students absent</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
