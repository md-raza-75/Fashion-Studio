import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Get name from localStorage or default to 'Mohammad Raza'
    const [userData, setUserData] = useState({
        name: localStorage.getItem("username") || 'Mohammad Raza',
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
        // Clear localStorage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Profile</h2>
                <div className="space-x-4">
                    <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                    <a href="/OrderHistory" className="text-gray-600 hover:text-gray-900">Order</a>
                    <a href="/payment-history" className="text-gray-600 hover:text-gray-900">Payments</a>
                    <a href="/Settings" className="text-gray-600 hover:text-gray-900">Settings</a>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-10 p-6">
                <div className="flex items-center space-x-6">
                    <img src="/images/model1.jpg" alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500" />
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                className="text-xl font-bold border rounded-md p-2"
                            />
                        ) : (
                            <h1 className="text-3xl font-semibold">{userData.name}</h1>
                        )}
                        <p className="text-gray-600">{userData.role}</p>
                        <div className="text-yellow-500 text-lg font-semibold">
                            Recommended <span>5.00 ★★★★★</span>
                        </div>
                        <div className="mt-4 space-x-3">
                            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Send Message</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">Contacts</button>
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">Report User</button> */}
                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600" onClick={handleEditToggle}>
                                {isEditing ? 'Save' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    {isEditing ? (
                        <>
                            <input type="text" name="phone" value={userData.phone} onChange={handleChange} className="border rounded-md p-2 w-full mb-2" />
                            <input type="text" name="address" value={userData.address} onChange={handleChange} className="border rounded-md p-2 w-full mb-2" />
                            <input type="text" name="email" value={userData.email} onChange={handleChange} className="border rounded-md p-2 w-full mb-2" />
                            <input type="text" name="website" value={userData.website} onChange={handleChange} className="border rounded-md p-2 w-full mb-2" />
                        </>
                    ) : (
                        <>
                            <p className="mb-2"><strong>Phone:</strong> {userData.phone}</p>
                            <p className="mb-2"><strong>Address:</strong> {userData.address}</p>
                            <p className="mb-2"><strong>E-mail:</strong> {userData.email}</p>
                            <p className="mb-2"><strong>Website:</strong> {userData.website}</p>
                        </>
                    )}
                </div>

                <div className="mt-6 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Profile Stats</h3>
                    <p className="mb-2"><strong>Orders:</strong> {userData.orders}</p>
                    <p className="mb-2"><strong>Wishlist Items:</strong> {userData.wishlist}</p>
                    <p className="mb-2"><strong>Reviews Written:</strong> {userData.reviews}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
