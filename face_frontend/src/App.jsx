

import "./App.css";
import { LoginPage } from "./components/Auth/LoginPage";
import { RegisterPage } from "./components/Auth/RegisterPage";
import { Dashboard } from "./components/DashBoard/Dashboard";
import { SessionsTable } from "./components/DashBoard/SessionsTable";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute"; // ✅ Fixed spelling
import { HomePage } from "./components/HomeComponent/HomePage";
import { CheckAttendance } from "./components/HomeComponent/CheckAttendance";
import { TakeAttendance } from "./components/HomeComponent/TakeAttendence";
import { NewClass } from "./components/DashBoard/NewClass";
import { AttendanceListOfEachDate } from "./components/HomeComponent/AttendanceListOfEachDate";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />, // ✅ Protects all routes inside
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "newClass", element: <NewClass /> },
          { path: "sessions", element: <SessionsTable /> },
          { path: "attendance/:courseName", element: <TakeAttendance /> }, // ✅ Route for dynamic attendance pages
          {
            path: "check-attendance/:courseName",
            element: <CheckAttendance />},
          {
            path: "attendancePerDate/:courseName/:date/:time",
            element: <AttendanceListOfEachDate />,
          }
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> }, // ✅ Redirects unknown routes to login
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
