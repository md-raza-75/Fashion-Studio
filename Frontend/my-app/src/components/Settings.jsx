import React, { useState } from 'react';
import '../Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({ name: 'Mohammad Raza', email: 'user@example.com', phone: '+91 705075191' });
  const [password, setPassword] = useState({ current: '', newPass: '', confirmPass: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleSavePassword = () => {
    if (password.newPass !== password.confirmPass) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="settings-container">
      {/* Fixed Full-Width Navbar */}
      <nav className="navbar fixed-navbar">
        <h2>Settings</h2>
        <div className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/logout" onClick={handleLogout}>Logout</a>
        </div>
      </nav>

      {/* Settings Sections */}
      <div className="content">
        <div className="section">
          <h2>Profile Settings</h2>
          <input type="text" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Full Name" />
          <input type="email" name="email" value={profile.email} onChange={handleProfileChange} placeholder="Email" />
          <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} placeholder="Phone Number" />
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
        
        <div className="section">
          <h2>Change Password</h2>
          <input type="password" name="current" value={password.current} onChange={handlePasswordChange} placeholder="Current Password" />
          <input type="password" name="newPass" value={password.newPass} onChange={handlePasswordChange} placeholder="New Password" />
          <input type="password" name="confirmPass" value={password.confirmPass} onChange={handlePasswordChange} placeholder="Confirm Password" />
          <button onClick={handleSavePassword}>Update Password</button>
        </div>
        
        <div className="section">
          <h2>Notification Preferences</h2>
          <label><input type="checkbox" name="email" checked={notifications.email} onChange={handleNotificationChange} /> Email Notifications</label>
          <label><input type="checkbox" name="sms" checked={notifications.sms} onChange={handleNotificationChange} /> SMS Notifications</label>
          <label><input type="checkbox" name="push" checked={notifications.push} onChange={handleNotificationChange} /> Push Notifications</label>
        </div>

        <div className="section">
          <h2>Payment Settings</h2>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="PayPal">PayPal</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;