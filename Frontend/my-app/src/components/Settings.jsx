import React, { useState } from 'react';

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
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <h2 className="text-2xl font-bold">Settings</h2>
        <div className="space-x-4">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
          <a href="/profile" className="text-gray-600 hover:text-gray-900">Profile</a>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Logout</button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-24 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="border rounded-md p-2 w-full mb-2" placeholder="Full Name" />
          <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="border rounded-md p-2 w-full mb-2" placeholder="Email" />
          <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} className="border rounded-md p-2 w-full mb-2" placeholder="Phone Number" />
          <button onClick={handleSaveProfile} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Save Profile</button>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <input type="password" name="current" value={password.current} onChange={handlePasswordChange} className="border rounded-md p-2 w-full mb-2" placeholder="Current Password" />
          <input type="password" name="newPass" value={password.newPass} onChange={handlePasswordChange} className="border rounded-md p-2 w-full mb-2" placeholder="New Password" />
          <input type="password" name="confirmPass" value={password.confirmPass} onChange={handlePasswordChange} className="border rounded-md p-2 w-full mb-2" placeholder="Confirm Password" />
          <button onClick={handleSavePassword} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">Update Password</button>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="email" checked={notifications.email} onChange={handleNotificationChange} className="form-checkbox text-blue-500" />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="sms" checked={notifications.sms} onChange={handleNotificationChange} className="form-checkbox text-blue-500" />
            <span>SMS Notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="push" checked={notifications.push} onChange={handleNotificationChange} className="form-checkbox text-blue-500" />
            <span>Push Notifications</span>
          </label>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border rounded-md p-2 w-full">
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="PayPal">PayPal</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>
      </div>
      <button className="fixed bottom-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;
