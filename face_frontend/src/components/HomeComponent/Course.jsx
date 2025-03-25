import { useNavigate } from 'react-router-dom';

export const Course = ({ courseName, numStudents, date }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">{courseName}</h2>
          <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-600 mb-4">
          No. of Students: <span className="font-medium">{numStudents}</span>
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate(`/attendance/${courseName}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
            aria-label="Take Attendance"
          >
            Take Attendance
          </button>
          <button
            onClick={() => navigate(`/check-attendance/${courseName}`)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
            aria-label="Check Attendance"
          >
            Check Attendance
          </button>
        </div>
      </div>
    </div>
  );
};
