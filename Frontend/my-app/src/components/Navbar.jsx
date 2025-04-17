import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Store username here

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("username");

    // If the user is logged in and we have a username, set them in state
    if (loginStatus === "true" && storedName) {
      setIsLoggedIn(true);
      setUsername(storedName); // Set the username
    }
  }, []); // Only runs on initial load

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(""); // Clear the username from state
    navigate("/login"); // Navigate to login page
  };

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

        <div className="auth-buttons" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isLoggedIn ? (
            <button
              style={{
                backgroundColor: "#ff4081",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer"
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          ) : (
            <>
              {/* Display the username here if the user is logged in */}
              <span style={{ fontWeight: "600", color: "#555" }}>
                Hi, {username || "User"} {/* If username is found, display it, else show "User" */}
              </span>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  cursor: "pointer"
                }}
                onClick={() => navigate('/profile')}
              >
                Profile
              </button>
              <button
                style={{
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  cursor: "pointer"
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {/* <button
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
          </button> */}
        </div>
      </header>
    </>
  );
}