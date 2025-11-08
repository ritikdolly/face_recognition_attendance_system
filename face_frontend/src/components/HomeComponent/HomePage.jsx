import { useEffect, useState } from "react";
import { getCoursesByTeacher } from "../../Api/Request";
import { Course } from "./Course";

export const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    const fetchCourses = async () => {
      if (!teacherId) {
        console.warn("No teacher ID found in localStorage.");
        return;
      }

      const response = await getCoursesByTeacher(teacherId);
      console.log("API Response:", response); // Debugging log

      if (response.status) {
        console.log("Courses:", response.data.courses); // Check if data is an array
        setCourses(response.data.courses);
      } else {
        console.error("Error fetching courses:", response.data.message);
      }
    };

    fetchCourses();
  }, [teacherId]);

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white flex flex-col items-center p-10 ">
      {/* Background with Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover bg-center opacity-20 blur-[3px]"></div>

      {/* Course Container */}
      <div className="w-full flex flex-wrap justify-center gap-8 z-10">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <Course key={index} courseName={course.courseName} numStudents={course.numStudents} date={course.date} />
          ))
        ) : (
          <p className="text-gray-400 text-lg">No courses available for this teacher.</p>
        )}
      </div>
    </div>
  );
};
