import { Outlet } from "react-router-dom";
import { Navbar } from "../HomeComponent/NavBar/Navbar";
import { Sidebar } from "../HomeComponent/NavBar/Sidebar";

export const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex flex-col flex-grow h-screen w-full">
          <Navbar />
          <div className="flex-grow bg-gray-50 p-4">
            <Outlet /> {/* ✅ This ensures child components render correctly */}
          </div>
        </div>
      </div>
    </>
  );
};
