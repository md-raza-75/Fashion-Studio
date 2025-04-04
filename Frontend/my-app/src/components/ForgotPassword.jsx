import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <h1 className="text-xl font-bold text-orange-600">R2P</h1>
      <a href="/register" className="text-orange-500 font-semibold hover:underline">
        Register Now
      </a>
    </nav>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    alert(`Password reset link sent to ${email}`);
    navigate("/login"); // Redirect to login after submission
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      <Navbar />
      {/* Forgot Password Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center mt-20">
        <h2 className="text-3xl font-semibold mb-3 text-orange-600">Forgot Password?</h2>
        <p className="text-gray-600 mb-6">Enter your email and we will send a password reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="e.g. username@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition mb-4"
          />
          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
            Send Reset Link
          </button>
        </form>

        <button 
          onClick={() => navigate("/login")} 
          className="mt-5 text-orange-600 font-semibold hover:underline"
        >
          &larr; Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;