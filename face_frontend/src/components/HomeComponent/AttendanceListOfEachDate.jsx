

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPresentAndAbsentListPreDate } from "../../Api/Request";

export const AttendanceListOfEachDate = () => {
  const { courseName, date, time } = useParams(); // Get params from URL
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
    getPresentAndAbsentListPreDate(
      teacherId,
      courseName,
      date,
      time
    )
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
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
          Attendance Details
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <p className="text-center text-lg text-gray-700">
              <span className="font-semibold">Course:</span> {courseName}
            </p>
            <p className="text-center text-lg text-gray-700">
              <span className="font-semibold">Date:</span> {date}
            </p>
            <p className="text-center text-lg text-gray-700">
              <span className="font-semibold">Time:</span> {time}
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-green-600">Present</h3>
              {attendanceDetails.present.length > 0 ? (
                <ul className="mt-2 bg-green-100 p-3 rounded-md shadow-md">
                  {attendanceDetails.present.map((student, index) => (
                    <li
                      key={index}
                      className="border-b last:border-none p-2 text-gray-800"
                    >
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-2">No students present</p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-red-600">Absent</h3>
              {attendanceDetails.absent.length > 0 ? (
                <ul className="mt-2 bg-red-100 p-3 rounded-md shadow-md">
                  {attendanceDetails.absent.map((student, index) => (
                    <li
                      key={index}
                      className="border-b last:border-none p-2 text-gray-800"
                    >
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-2">No students absent</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
