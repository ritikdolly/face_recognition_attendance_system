import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { createCourse } from "../../Api/Request";
import { useNavigate } from "react-router-dom";

export const NewClass = () => {
  const [className, setClassName] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const teacherId = localStorage.getItem("teacherId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!className || !studentCount || !file) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    if (!teacherId) {
      alert("Teacher ID is missing. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("courseName", className);
      formData.append("numStudents", studentCount);
      formData.append("zipFile", file);
      formData.append("teacherId", teacherId);

      const response = await createCourse(formData);

      if (response.status) {
        alert("Class added successfully!");
        setClassName("");
        setStudentCount("");
        setFile(null);
        navigate("/");
      } else {
        alert("Error: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting class:", error);
      alert("Failed to create class. Please check the console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 w-full">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          CREATE A NEW CLASS
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700">
              Class/Course Name
            </label>
            <input
              type="text"
              placeholder="eg: CS-311 Artificial Intelligence"
              className="w-full mt-1 p-2 border rounded-lg"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Number of students in Class/Course
            </label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              value={studentCount}
              onChange={(e) => setStudentCount(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Students Data
            </label>
            <p className="text-sm text-gray-500">
              Upload a zip file with each student's images in separate folders,
              named according to roll numbers.
            </p>
            <label className="mt-2 flex items-center justify-center border border-dashed rounded-lg p-6 cursor-pointer">
              <UploadCloud size={24} className="text-gray-500" />
              <span className="ml-3 text-gray-600">
                {file ? file.name : "Choose a file"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".zip"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </form>
      </div>
    </div>
  );
};
