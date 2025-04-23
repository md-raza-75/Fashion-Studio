import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [netBanking, setNetBanking] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [step, setStep] = useState(1); // 1: User Details, 2: Payment Method
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    // Load cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
    
    // Calculate total amount
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotalAmount(total || 999); // Default to 999 if no items in cart
    
    // Load user details if available
    const savedUserDetails = localStorage.getItem('lastDeliveryDetails');
    if (savedUserDetails) {
      try {
        setUserDetails(JSON.parse(savedUserDetails));
      } catch (error) {
        console.error('Error parsing saved user details:', error);
      }
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };
  
  const validateUserDetails = () => {
    if (!userDetails.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!userDetails.phone.trim() || !/^\d{10}$/.test(userDetails.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!userDetails.email.trim() || !/\S+@\S+\.\S+/.test(userDetails.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!userDetails.address.trim()) {
      alert('Please enter your address');
      return false;
    }
    if (!userDetails.city.trim()) {
      alert('Please enter your city');
      return false;
    }
    if (!userDetails.state.trim()) {
      alert('Please enter your state');
      return false;
    }
    if (!userDetails.pincode.trim() || !/^\d{6}$/.test(userDetails.pincode)) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };
  
  const proceedToPayment = () => {
    if (validateUserDetails()) {
      setStep(2); // Move to payment method step
    }
  };
  
  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare payment data
      const paymentData = {
        user_name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        city: userDetails.city,
        state: userDetails.state,
        pincode: userDetails.pincode,
        payment_method: selectedMethod,
        amount: totalAmount
      };
      
      // Send payment data to backend
      const response = await axios.post('http://localhost:3000/api/payments', paymentData);
      
      if (response.data.success) {
        // Show success message
        alert(`आपका आर्डर सफलतापूर्वक प्लेस हो गया है! धन्यवाद!\n\nYour order has been placed successfully! Thank you for shopping with R2P.`);
        
        // Clear cart items from localStorage
        localStorage.removeItem('cartItems');
        localStorage.removeItem('selectedProduct');
        
        // Save the delivery details for future use
        localStorage.setItem('lastDeliveryDetails', JSON.stringify(userDetails));
        
        // Set order placed state
        setOrderPlaced(true);
        
        // Navigate to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-20 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Secure Checkout</h1>
          
          {/* Cart summary */}
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
            <div className="border-t border-b py-2 mb-2">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>{item.name} x {item.quantity || 1}</span>
                    <span>₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">Sample order</div>
              )}
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {orderPlaced ? (
            <div className="text-center my-6">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h2 className="text-xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-4">Thank you for your purchase. Your order is being processed.</p>
              <button 
                onClick={() => navigate('/')} 
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="flex mb-6">
                <div className={`w-1/2 text-center py-2 ${step === 1 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
                  1. Delivery Details
                </div>
                <div className={`w-1/2 text-center py-2 ${step === 2 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>
                  2. Payment Method
                </div>
              </div>
              
              {step === 1 ? (
                /* User Details Form */
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Delivery Details</h2>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={userDetails.name} 
                      onChange={handleInputChange} 
                      placeholder="Enter your full name" 
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={userDetails.phone} 
                      onChange={handleInputChange} 
                      placeholder="10-digit mobile number" 
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={userDetails.email} 
                      onChange={handleInputChange} 
                      placeholder="Your email address" 
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Address *</label>
                    <textarea 
                      name="address" 
                      value={userDetails.address} 
                      onChange={handleInputChange} 
                      placeholder="Your full address" 
                      className="w-full p-2 border rounded"
                      rows="2"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 mb-1">City *</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={userDetails.city} 
                        onChange={handleInputChange} 
                        placeholder="City" 
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">State *</label>
                      <input 
                        type="text" 
                        name="state" 
                        value={userDetails.state} 
                        onChange={handleInputChange} 
                        placeholder="State" 
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Pincode *</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      value={userDetails.pincode} 
                      onChange={handleInputChange} 
                      placeholder="6-digit pincode" 
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  <button 
                    className="w-full bg-pink-500 text-white p-3 mt-4 rounded-lg font-semibold hover:bg-pink-600 transition"
                    onClick={proceedToPayment}
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                /* Payment Options */
          <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Select Payment Method</h2>
                  
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

                  <div className="flex space-x-3 mt-4">
                    <button 
                      className="w-1/3 bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      className={`w-2/3 bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={handlePayment}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
