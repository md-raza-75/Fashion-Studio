import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => (
  <div className="fixed top-0 left-0 w-full bg-pink-500 text-white shadow-md py-4 px-8 flex justify-between items-center z-50">
      <div className="text-xl font-bold">R2P</div>
      <div className="flex space-x-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/products" className="hover:underline">Products</a>
          <a href="/profile" className="hover:underline">Profile</a>
      </div>
  </div>
);

const Footer = () => (
  <div className="bg-gray-900 text-white text-center py-6 mt-10">
    <p className="text-sm">© 2024 R2P. All rights reserved.</p>
  </div>
);

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [netBanking, setNetBanking] = useState('');
  
  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    alert(`Payment successful using ${selectedMethod}!`);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-20 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Secure Payment</h1>

          {/* Payment Options */}
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="radio" value="Credit Card" checked={selectedMethod === 'Credit Card'} onChange={() => setSelectedMethod('Credit Card')} />
              <span>Credit Card</span>
            </label>
            {selectedMethod === 'Credit Card' && (
              <div className="space-y-2">
                <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
                <div className="flex space-x-2">
                  <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
                  <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded" />
                </div>
              </div>
            )}

            <label className="flex items-center space-x-2">
              <input type="radio" value="UPI" checked={selectedMethod === 'UPI'} onChange={() => setSelectedMethod('UPI')} />
              <span>UPI</span>
            </label>
            {selectedMethod === 'UPI' && <input type="text" placeholder="Enter UPI ID" className="w-full p-2 border rounded" />}

            <label className="flex items-center space-x-2">
              <input type="radio" value="PayPal" checked={selectedMethod === 'PayPal'} onChange={() => setSelectedMethod('PayPal')} />
              <span>PayPal</span>
            </label>
            {selectedMethod === 'PayPal' && <input type="email" placeholder="Enter PayPal Email" className="w-full p-2 border rounded" />}

            <label className="flex items-center space-x-2">
              <input type="radio" value="Net Banking" checked={selectedMethod === 'Net Banking'} onChange={() => setSelectedMethod('Net Banking')} />
              <span>Net Banking</span>
            </label>
            {selectedMethod === 'Net Banking' && (
              <select className="w-full p-2 border rounded">
                <option value="">Select Your Bank</option>
                <option value="SBI">SBI</option>
                <option value="HDFC">HDFC</option>
                <option value="ICICI">ICICI</option>
                <option value="Axis Bank">Axis Bank</option>
              </select>
            )}

            <label className="flex items-center space-x-2">
              <input type="radio" value="Cash on Delivery" checked={selectedMethod === 'Cash on Delivery'} onChange={() => setSelectedMethod('Cash on Delivery')} />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Pay Now Button */}
          <button className="w-full bg-pink-500 text-white p-3 mt-4 rounded-lg font-semibold hover:bg-pink-600 transition" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
