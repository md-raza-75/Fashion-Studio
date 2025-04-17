import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email) {
      setUserEmail(user.email);
      fetchPayments(user.email);
    } else {
      setLoading(false);
      setError('Please log in to view your payment history');
    }
  }, []);

  const fetchPayments = async (email) => {
    try {
      setLoading(true);
      // For demo purposes, we'll fetch all payments since the user-specific route is protected
      const response = await axios.get('http://localhost:3000/api/payments');
      
      // In a real app with auth, you would use:
      // const response = await axios.get(`http://localhost:3000/api/payments/user/${email}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });
      
      if (response.data.success) {
        setPayments(response.data.data);
      } else {
        setError('Failed to fetch payment data');
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('An error occurred while fetching your payment history');
    } finally {
      setLoading(false);
    }
  };

  // Format date from ISO to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const viewPaymentDetails = (paymentId) => {
    navigate(`/payment/${paymentId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
              {!userEmail && (
                <button 
                  onClick={() => navigate('/login')} 
                  className="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                >
                  Log In
                </button>
              )}
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't made any payments yet.</p>
              <button 
                onClick={() => navigate('/products')} 
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => viewPaymentDetails(payment.id)}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(payment.created_at)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">#{payment.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{parseFloat(payment.amount).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.payment_method}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              viewPaymentDetails(payment.id);
                            }}
                            className="text-pink-600 hover:text-pink-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentHistory; 