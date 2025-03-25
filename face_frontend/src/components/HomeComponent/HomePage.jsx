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
    <div className="bg-gray-100 p-6 flex flex-wrap items-start justify-evenly">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <Course key={index} courseName={course.courseName} numStudents={course.numStudents} date={course.date} />
        ))
      ) : (
        <p className="text-gray-600">No courses available for this teacher.</p>
      )}
    </div>
  );
};
