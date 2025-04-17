import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Passwords must match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // User must agree to the terms
    if (!formData.agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful! Please login.");

      // Store the name and login status in localStorage
      localStorage.setItem("username", formData.name);
      localStorage.setItem("isLoggedIn", "true");

      // Navigate to login after signup
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response) {
        const errorMessage = error.response.data.message || "Signup failed. Try again later.";
        alert(errorMessage);
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center min-h-screen pt-16 px-6">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
          <p className="text-gray-600 text-center mb-4">Create your account to explore our fashion collection.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border rounded-lg"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="w-full p-3 border rounded-lg"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agree"
                className="w-4 h-4"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label className="text-gray-600">I agree to the terms and conditions</label>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-pink-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
