import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div
          className="logo"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
          onClick={() => navigate('/')}
        >
          R2P
        </div>

        <nav
          style={{
            display: "flex",
            gap: "20px",
            fontWeight: "500"
          }}
        >
          <a href="#" className="active" style={{ color: "#ff4081" }}>Home</a>
          <a href="#">Kurti</a>
          <a href="#">Gown</a>
          <a href="#">Saree</a>
          <a href="#">Jewellery</a>
        </nav>

        <div className="auth-buttons">
          <button
            style={{
              backgroundColor: "#ff4081",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>

          <button
            style={{
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer"
            }}
            onClick={() => navigate('/admin')}
          >
            Admin
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}
 