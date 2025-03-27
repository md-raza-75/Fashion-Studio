import React, { useState } from 'react';
import '../ProfilePage.css';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Mohammad Raza',
        role: 'Product Designer',
        phone: '+8801900000000',
        address: 'The Empire State Building - 350 Fifth Avenue, New York City, NY 10118',
        email: 'example@gmail.com',
        website: 'example.com',
        orders: 12,
        wishlist: 8,
        reviews: 5
    });

    const handleEditToggle = () => setIsEditing(!isEditing);
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        navigate('/login'); // Redirect to login page or homepage after logout
    };

    return (
        <div>
            <nav className="navbar">
                <h2 className="navbar-title">My Profile</h2>
                <div className="navbar-links">
                    <a href="#">Home</a>
                    <a href="/">Products</a>
                    <a href="Settings">Settings</a>
                    <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="profile-container">
                <div className="profile-header">
                    <img 
                        src="/images/model1.jpg" 
                        alt="Profile" 
                        className="profile-image" 
                    />
                    <div className="profile-details">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                            />
                        ) : (
                            <h1>{userData.name}</h1>
                        )}
                        <p className="role">{userData.role}</p>
                        <div className="rating">Recommended <span>5.00 ★★★★★</span></div>
                        <div className="actions">
                            <button className="btn">Send Message</button>
                            <button className="btn primary">Contacts</button>
                            <button className="btn">Report User</button>
                            <button className="btn edit-btn" onClick={handleEditToggle}>{isEditing ? 'Save' : 'Edit Profile'}</button>
                        </div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="section">
                        <h3>Contact Information</h3>
                        {isEditing ? (
                            <>
                                <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                                <input type="text" name="address" value={userData.address} onChange={handleChange} />
                                <input type="text" name="email" value={userData.email} onChange={handleChange} />
                                <input type="text" name="website" value={userData.website} onChange={handleChange} />
                            </>
                        ) : (
                            <>
                                <p><strong>Phone:</strong> {userData.phone}</p>
                                <p><strong>Address:</strong> {userData.address}</p>
                                <p><strong>E-mail:</strong> {userData.email}</p>
                                <p><strong>Website:</strong> {userData.website}</p>
                            </>
                        )}
                    </div>
                    <div className="section">
                        <h3>Profile Stats</h3>
                        <p><strong>Orders:</strong> {userData.orders}</p>
                        <p><strong>Wishlist Items:</strong> {userData.wishlist}</p>
                        <p><strong>Reviews Written:</strong> {userData.reviews}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
