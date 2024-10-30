import React, { useState } from "react";
import Logo from "../images/starringblack.png";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username and password are correct
    if (username === "StarringAdmin01" && password === "*#123&%478SSERd") {
      onLogin(); // Call the onLogin prop to set authentication
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-black rounded-lg focus:outline-none focus:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
