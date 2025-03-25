import { FaHome, FaPlus, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("userToken"); // Remove token
      localStorage.removeItem("teacherId"); // Remove token
      navigate("/login", { replace: true }); // Redirect to login page
    };
  return (
    <div className="w-64 h-screen bg-gray-100 shadow-lg p-5 border-r-2 border-gray-300">
      <p className="text-purple-700 text-3xl font-bold">ATTENDANCE PORTAL</p>
      <hr className="mt-3 text-gray-400"/>
      <ul className="mt-6 space-y-4 text-purple-700">
        <li onClick={() => navigate("")} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
          <FaHome />
          <span>Home</span>
        </li>
        <li onClick={() => navigate("newClass")} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
          <FaPlus />
          <span>New Class</span>
        </li>
        <li onClick={() => navigate("sessions")} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
          <FaCalendarAlt />
          <span>Sessions</span>
        </li>
        <li onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
          <FaSignOutAlt />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};


