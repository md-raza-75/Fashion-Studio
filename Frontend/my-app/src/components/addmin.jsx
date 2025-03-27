import React from "react";
import "../addmin.css";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#C97B8C]">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-5 flex flex-col">
        <h1 className="text-xl font-bold text-blue-600">Sales.</h1>
        <nav className="mt-5">
          <ul>
            <li className="text-blue-600 font-bold">Dashboard</li>
            <li>Lab Test</li>
            <li>Appointment</li>
            <li>Medicine Order</li>
            <li>Message</li>
            <li>Payment</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="mt-auto">Help</div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-5">
        {/* Navbar */}
        <div className="flex justify-between items-center">
          <input type="text" placeholder="Search" className="border p-2 rounded w-1/2" />
          <div className="flex items-center gap-4">
            <span className="p-2 bg-gray-200 rounded-full">🔔</span>
            <span className="p-2 bg-gray-200 rounded-full">👤</span>
          </div>
        </div>

        {/* Sales Information */}
        <h2 className="text-2xl font-bold mt-5">Sales Information</h2>
        <div className="flex gap-4 my-4">
          <input type="text" placeholder="Enter Customer Name" className="border p-2 rounded w-1/4" />
          <input type="text" placeholder="Enter Invoice ID" className="border p-2 rounded w-1/4" />
          <input type="date" className="border p-2 rounded w-1/4" />
          <input type="date" className="border p-2 rounded w-1/4" />
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th></th>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Payable Amount</th>
                <th>Paid Amount</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {Array(10).fill().map((_, index) => (
                <tr key={index} className="border-t">
                  <td><input type="checkbox" /></td>
                  <td className="text-blue-600">#AHGA6B</td>
                  <td>23/09/2022</td>
                  <td>Jacob Marcus</td>
                  <td>$100</td>
                  <td>$000</td>
                  <td>$000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
