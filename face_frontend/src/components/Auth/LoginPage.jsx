import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCoursesByTeacher } from "../../Api/Request"; // Import API functions

export const LoginPage = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    const result = await loginUser(user);
    
    if (result.status) {
      // ✅ Store token
      localStorage.setItem("userToken", result.data.token);

      if (result.data.teacherId) {
        // ✅ Store teacherId
        localStorage.setItem("teacherId", result.data.teacherId);

        // ✅ Fetch and store teacher's courses
        const coursesResult = await getCoursesByTeacher(result.data.teacherId);
        if (coursesResult.status) {
          localStorage.setItem("teacherCourses", JSON.stringify(coursesResult.data));
        }
      }

      navigate("/"); // ✅ Redirect to home page
    } else {
      setError(result.data.message || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your Username"
              name="username"
              autoComplete="off"
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
              placeholder="Enter your Password"
              autoComplete="off"
              value={user.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 mt-4 font-medium text-white rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <p
          onClick={() => navigate("/register")}
          className="mt-4 text-sm text-center text-gray-600 cursor-pointer"
        >
          Don't have an account?{" "}
          <span className="text-blue-500 hover:underline">Sign up</span>
        </p>
      </div>
    </div>
  );
};
