import React from "react";
import "../Signup.css";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="navbar" style={{ backgroundColor: "#F8BBD0" }}>
        <span className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </span>
        <nav>
          <a href="/">Home</a>
          <a href="/kurti">Kurti</a>
          <a href="/gown">Gown</a>
          <a href="/saree">Saree</a>
          <a href="/jewellery">Jewellery</a>
        </nav>
      </div>

      <div className="login-content">
        <div className="login-form">
          <h1>Sign Up</h1>
          <p>Create your account to explore our fashion collection.</p>

          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />

            <div className="options">
              <label>
                <input type="checkbox" required /> I agree to the terms and conditions
              </label>
            </div>

            <button type="submit" className="sign-in">Sign Up</button>
          </form>

          <div className="signup">
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </div>

        <div className="login-image">
          <img src="/images/p1.jpg" alt="Fashion Signup" />
        </div>
      </div>
    </div>
  );
}
