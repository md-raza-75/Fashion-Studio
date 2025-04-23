import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        // For demonstration purposes, we'll redirect to the payments history page if there's no ID
        if (!id) {
          navigate('/payment-history');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/payments/${id}`);
        if (response.data.success) {
          setPayment(response.data.data);
        } else {
          setError('Failed to fetch payment details');
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setError('An error occurred while fetching the payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-24 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/payment-history')}
            className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Payments
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          ) : payment ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Payment #{payment.id}</h2>
                    <p className="text-gray-600">{formatDate(payment.created_at)}</p>
                  </div>
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                    {payment.status}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="mb-2"><span className="font-medium">Name:</span> {payment.user_name}</p>
                      <p className="mb-2"><span className="font-medium">Email:</span> {payment.email}</p>
                      <p className="mb-2"><span className="font-medium">Phone:</span> {payment.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="mb-2">{payment.address}</p>
                      <p className="mb-2">{payment.city}, {payment.state} {payment.pincode}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="mb-2"><span className="font-medium">Payment Method:</span> {payment.payment_method}</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-right">₹{parseFloat(payment.amount).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button 
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded"
                    onClick={() => window.print()}
                  >
                    Print Receipt
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">Payment not found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentDetails; 
