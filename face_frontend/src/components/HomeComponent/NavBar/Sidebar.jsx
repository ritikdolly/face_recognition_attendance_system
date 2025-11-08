// import { FaHome, FaPlus, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export const Sidebar = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//       localStorage.removeItem("userToken"); // Remove token
//       localStorage.removeItem("teacherId"); // Remove token
//       navigate("/login", { replace: true }); // Redirect to login page
//     };
//   return (
//     <div className="w-64 h-screen bg-gray-100 shadow-lg p-5 border-r-2 border-gray-300">
//       <p className="text-purple-700 text-3xl font-bold">ATTENDANCE PORTAL</p>
//       <hr className="mt-3 text-gray-400"/>
//       <ul className="mt-6 space-y-4 text-purple-700">
//         <li onClick={() => navigate("")} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
//           <FaHome />
//           <span>Home</span>
//         </li>
//         <li onClick={() => navigate("newClass")} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
//           <FaPlus />
//           <span>New Class</span>
//         </li>
//         <li onClick={() => navigate("sessions")} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
//           <FaCalendarAlt />
//           <span>Sessions</span>
//         </li>
//         <li onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-200 cursor-pointer">
//           <FaSignOutAlt />
//           <span>Log Out</span>
//         </li>
//       </ul>
//     </div>
//   );
// };

import {
  FaHome,
  FaPlus,
  FaCalendarAlt,
  FaSignOutAlt,
  FaCamera,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PiScanSmileyFill } from "react-icons/pi";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("teacherId");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white shadow-lg border-r border-gray-700 relative overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover bg-center opacity-20 blur-sm h-full w-full"></div>

      {/* Sidebar Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Logo / Title */}
        <div className="flex items-center space-x-6 cursor-pointer " onClick={() => navigate("/")}>
          <h1 className="flex  items-center gap-1 text-2xl font-bold text-blue-400 text-[#06B6D4] tracking-wide cursor-pointer hover:text-[#0284C7] transition-al" >
            <PiScanSmileyFill className="text-4xl" />
            FaceScanX
          </h1>
        </div>

        <hr className="mt-4 border-gray-600" />

        {/* Navigation Menu */}
        <ul className="mt-6 space-y-4 flex-grow">
          <li
            onClick={() => navigate("")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
          >
            <FaHome className="text-lg" />
            <span className="text-lg">Home</span>
          </li>
          <li
            onClick={() => navigate("newClass")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
          >
            <FaPlus className="text-lg" />
            <span className="text-lg">New Class</span>
          </li>
          <li
            onClick={() => navigate("sessions")}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
          >
            <FaCalendarAlt className="text-lg" />
            <span className="text-lg">Sessions</span>
          </li>
          <li
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 cursor-pointer transition duration-300"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-lg">Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
