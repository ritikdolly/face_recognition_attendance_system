// import { useNavigate } from "react-router-dom";

// export const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-purple-800 btn text-white p-4 text-lg font-bold ">
//       <span className="cursor-pointer" onClick={()=> navigate("/")} >DASHBOARD</span>
//     </div>
//   );
// };

// import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import an icon for user profile

export const Navbar = () => {
  // const navigate = useNavigate();

  return (
    <nav className="relative w-full bg-[#0F172A] shadow-md py-4 px-8 flex justify-between items-center border-b border-gray-600">
      {/* Logo or Title */}
      <div className="text-2xl font-extrabold text-[#06B6D4]">
        FaceRecognition AI
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {/* <FaUser className="text-[#06B6D4] text-2xl cursor-pointer hover:text-[#0284C7] transition-all" />
        <span className="text-gray-300 text-lg font-medium cursor-pointer hover:text-white transition-all" onClick={() => navigate("/profile")}>Profile</span> */}
      </div>
    </nav>
  );
};
