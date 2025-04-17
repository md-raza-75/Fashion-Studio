import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Store the JWT token in localStorage
      localStorage.setItem("authToken", response.data.token); // Store the token
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", response.data.name || "User"); // fallback if name is not returned

      // Navigate to homepage or the page the user was trying to access
      navigate("/", { replace: true });
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-pink-200">
      <div className="flex flex-grow items-center justify-center px-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">WELCOME BACK</h1>
          <p className="text-center text-gray-600">Welcome back! Please enter your details.</p>

          <form onSubmit={handleLogin}>
            <label className="block mt-4 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block mt-4 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">Remember me</label>
              </div>
              <Link to="/ForgotPassword" className="text-pink-600 hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-center mt-4 text-gray-700">
            Don't have an account? <Link to="/signup" className="text-red-500 hover:underline">Sign up for free!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
