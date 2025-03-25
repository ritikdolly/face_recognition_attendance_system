import { Navigate, Outlet } from "react-router-dom";

// ✅ Private Route: Redirects to "/login" if user is not authenticated
const PrivateRoute = () => {
  const token = localStorage.getItem("userToken");
  
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

