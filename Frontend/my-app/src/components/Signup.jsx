import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Full-Width Navbar */}
      <div className="fixed top-0 left-0 w-full bg-pink-300 shadow-md py-4 px-8 flex justify-between items-center z-50">
        <span className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate(-1)}>
          ← Back
        </span>
        <nav className="flex space-x-6">
          <a href="/" className="text-white font-medium hover:underline">Home</a>
          <a href="/kurti" className="text-white font-medium hover:underline">Kurti</a>
          <a href="/gown" className="text-white font-medium hover:underline">Gown</a>
          <a href="/saree" className="text-white font-medium hover:underline">Saree</a>
          <a href="/jewellery" className="text-white font-medium hover:underline">Jewellery</a>
        </nav>
      </div>

      {/* Signup Form Section */}
      <div className="flex justify-center items-center min-h-screen pt-16 px-6">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
          <p className="text-gray-600 text-center mb-4">Create your account to explore our fashion collection.</p>

          <form className="space-y-4">
            <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg" />
            <input type="email" placeholder="Email Address" required className="w-full p-3 border rounded-lg" />
            <input type="password" placeholder="Password" required className="w-full p-3 border rounded-lg" />
            <input type="password" placeholder="Confirm Password" required className="w-full p-3 border rounded-lg" />

            <div className="flex items-center space-x-2">
              <input type="checkbox" required className="w-4 h-4" />
              <label className="text-gray-600">I agree to the terms and conditions</label>
            </div>

            <button type="submit" className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 transition">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            Already have an account? <span className="text-pink-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}
