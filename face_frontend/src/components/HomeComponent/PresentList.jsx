import { Hand } from "lucide-react";
import { markAttendance } from "../../Api/Request";
import { useNavigate, useParams } from "react-router-dom";

const PresentList = ({ regNos = [] }) => {

  const teacherId = localStorage.getItem("teacherId");
  const { courseName } = useParams();
  const navigate = useNavigate();
    const handleSubmit = async(e) => {
      e.preventDefault();

      if (regNos.length === 0) {
        alert("No students present to submit!");
        return;
      }

      try {
        const attendanceData = {
          teacherId,
          courseName,
          present_students: regNos
        };
        const response = await markAttendance(attendanceData);

      if (response.status) {
        alert("Attendance submitted successfully!");
        navigate("/sessions");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  };




    return (
      <div className="w-1/3 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Present Students
        </h2>
        <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-600 text-white text-center">
                <th className="p-3">S No.</th>
                <th className="p-3">Student Reg</th>
              </tr>
            </thead>
            <tbody>
              {regNos.length > 0 ? (
                regNos.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t text-center border-gray-300 odd:bg-gray-200 even:bg-gray-100"
                  >
                    <td className="p-3 font-medium">{index + 1}</td>
                    <td className="p-3">{student}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-3 text-center text-gray-500">
                    NO Data Present
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          Submit
        </button>
        <p className="text-lg font-medium text-gray-800 mt-4 text-center">
          Total Recognized: {regNos.length}
        </p>
      </div>
    );
  };
  
  export default PresentList;
  