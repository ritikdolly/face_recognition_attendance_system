// import { Outlet } from "react-router-dom";
// import { Navbar } from "../HomeComponent/NavBar/Navbar";
// import { Sidebar } from "../HomeComponent/NavBar/Sidebar";

// export const Dashboard = () => {
//   return (
//     <>
//       <div className="flex h-screen w-full">
//         <Sidebar />
//         <div className="flex flex-col flex-grow h-screen w-full">
//           <Navbar />
//           <div className="flex-grow bg-gray-50 ">
//             <Outlet /> {/* ✅ This ensures child components render correctly */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import { Outlet } from "react-router-dom";
import { Navbar } from "../HomeComponent/NavBar/Navbar";
import { Sidebar } from "../HomeComponent/NavBar/Sidebar";

export const Dashboard = () => {
  return (
    <div className="relative flex h-screen w-full bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-face-recognition-bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>

      {/* Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex flex-col flex-grow h-screen w-full mt-">
        {/* Navbar (Fixed) */}
        <div className="text-2xl mr-10 item-center font-extrabold text-[#06B6D4]">
          <h2>FaceRecognition AI</h2>
        </div>
        {/* Scrollable Outlet Area with Hidden Scrollbar */}
        <div className="flex-grow w-full bg-gray-800 bg-opacity-80 shadow-xl backdrop-blur-md overflow-y-auto scrollbar-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
