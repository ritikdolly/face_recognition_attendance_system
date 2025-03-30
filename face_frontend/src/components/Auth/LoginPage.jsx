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
          localStorage.setItem(
            "teacherCourses",
            JSON.stringify(coursesResult.data)
          );
        }
      }

      navigate("/"); // ✅ Redirect to home page
    } else {
      setError(result.data.message || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 bg-[url('/image.png')] bg-cover bg-center filter blur"></div>
  
    {/* Login Form */}
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">LOGIN</h2>
        <p className="text-center text-gray-600 mb-6">Enter your credentials to login.</p>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
            <input
              type="email"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              name="email"
              autoComplete="off"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
  
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              placeholder="Enter your password"
              autoComplete="off"
              value={user.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>
  
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="equalPassword"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="equalPassword" className="ml-2 block text-sm text-gray-700">
                Equal Password
              </label>
            </div>
          </div>
  
          <button
            type="submit"
            className={`w-full px-4 py-3 mt-6 font-medium text-white rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
  
        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
  
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <span 
            onClick={() => navigate("/register")} 
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Register Now
          </span>
        </p>
      </div>
    </div>
  </div>
  
  );
};
