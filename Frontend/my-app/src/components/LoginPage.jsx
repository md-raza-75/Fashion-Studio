  import React from "react";
  import { Link, useNavigate } from "react-router-dom";

  export default function LoginPage() {
    const navigate = useNavigate();

    return (
      <div className="h-screen flex flex-col bg-pink-200">
        <header className="flex justify-between items-center bg-pink-500 p-4 shadow-md">
          <div className="text-white text-2xl cursor-pointer">&#8592;</div>
          <nav className="flex space-x-6">
            <a href="#" className="text-white font-semibold">Home</a>
            <a href="#" className="text-white font-semibold">Kurti</a>
            <a href="#" className="text-white font-semibold">Gown</a>
            <a href="#" className="text-white font-semibold">Saree</a>
            <a href="#" className="text-white font-semibold">Jewellery</a>
          </nav>
          <div className="text-white font-semibold">Profile</div>
        </header>

        <div className="flex flex-grow items-center justify-center px-6">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center">WELCOME BACK</h1>
            <p className="text-center text-gray-600">Welcome back! Please enter your details.</p>
            
            <label className="block mt-4 text-gray-700">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded-md" />
            
            <label className="block mt-4 text-gray-700">Password</label>
            <input type="password" placeholder="********" className="w-full p-2 border border-gray-300 rounded-md" />
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">Remember me</label>
              </div>
              <Link to="/ForgotPassword" className="text-pink-600 hover:underline">Forgot password?</Link>
              </div>
            
            <button className="w-full mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">Sign in</button>
            
            <p className="text-center mt-4 text-gray-700">
              Don't have an account? <Link to="/signup" className="text-red-500 hover:underline">Sign up for free!</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
