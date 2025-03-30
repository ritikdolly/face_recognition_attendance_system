import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-purple-800 btn text-white p-4 text-lg font-bold ">
      <span className="cursor-pointer" onClick={()=> navigate("/")} >DASHBOARD</span>
    </div>
  );
};

  