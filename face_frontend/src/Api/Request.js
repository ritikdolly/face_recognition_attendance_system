/* eslint-disable no-unused-vars */
import { BASE_URL } from "../config/api.js";

const apiRequest = async (endpoint, method, data = null, isFormData = false) => {
  try {
    console.log(`Sending ${method} request to: ${BASE_URL}/api/${endpoint}`);

    const options = {
      method,
      headers: {},
    };

    // Include token for authentication if available
    const token = localStorage.getItem("userToken");
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (method !== "GET" && method !== "HEAD") {
      options.body = isFormData ? data : JSON.stringify(data);
      if (!isFormData) {
        options.headers["Content-Type"] = "application/json";
      }
    }

    const response = await fetch(`${BASE_URL}/api/${endpoint}`, options);
    
    // Read response text first
    const text = await response.text();

    console.log("Response Status:", response.status);
    console.log("Response Body:", text);

    // Try parsing JSON
    let jsonResponse = {};
    try {
      jsonResponse = text ? JSON.parse(text) : {};
    } catch (e) {
      console.warn("Invalid JSON response, returning raw text instead.");
      jsonResponse = { rawResponse: text };
    }

    if (!response.ok) {
      throw new Error(jsonResponse.message || `HTTP error! Status: ${response.status}`);
    }

    return { status: true, data: jsonResponse };
  } catch (error) {
    console.error("API Request Error:", error);
    return { status: false, data: { message: error.message || "Network error or incorrect API URL" } };
  }
};

// ✅ User Authentication APIs
export const loginUser = async (userData) => apiRequest("auth/login", "POST", userData);
export const registerUser = async (userData) => apiRequest("auth/register", "POST", userData);
export const logoutUser = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("teacherId");
};

// ✅ Course APIs
export const createCourse = async (formData) => apiRequest("auth/create_course", "POST", formData, true);
export const getCoursesByTeacher = async (teacherId) => apiRequest(`auth/get_courses?teacherId=${teacherId}`, "GET");
export const getCourseDetails = async (courseId) => apiRequest(`attendance/course/${courseId}`, "GET");

// ✅ Attendance APIs
export const markAttendance = async (attendanceData) => apiRequest("attendance/mark_attendance", "POST", attendanceData);

export const getAttendanceByCourse = async (courseId) => apiRequest(`attendance?courseId=${courseId}`, "GET");

// ✅ Teacher APIs
export const getTeacherDetails = async (teacherId) => apiRequest(`teacher/${teacherId}`, "GET");
