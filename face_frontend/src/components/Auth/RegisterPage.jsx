// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../Api/Request";

// export const RegisterPage = () => {

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // eslint-disable-next-line no-undef
//     const response = await registerUser(user);

//     if (response.status) {

//       navigate("/login"); // Redirect on success
//       console.log("Registering with:", formData);
//     alert("Registration successful!");
//     } else {
//       alert(response.data.message); // Show error message
//     }

    
//   };

//   return (
//     <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
//         {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Enter your phone number"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Confirm your password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 mt-4 font-medium text-white !bg-blue-500 rounded-lg hover:!bg-blue-600 focus:ring-2 focus:ring-blue-400"
//           >
//             Register
//           </button>
//         </form>

//         <p onClick={() => navigate("/login")} className="mt-4 text-sm text-center text-gray-600">
//           Already have an account? <a href="#" className="text-blue-500 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Api/Request"; // Import API function

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const response = await registerUser(formData); // Corrected variable name

    if (response.status) {
      alert("Registration successful!");
      navigate("/login"); // Redirect on success
    } else {
      alert(response.data.message); // Show error message
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
