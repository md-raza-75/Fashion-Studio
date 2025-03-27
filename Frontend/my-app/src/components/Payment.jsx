import React, { useState } from 'react';
import '../Payment.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => (
  <div className="navbar">
      <div className="logo">R2P</div>
      <div className="nav-links">
          <a href="/">Home</a>
          <a href="">Products</a>
          <a href="/profile">Profile</a>
      </div>
  </div>
);

const Footer = () => (
  <div className="footer">
    <div className="footer-section">
      <h3>About</h3>
      <p>R2P offers the latest trends in fashion for all ages.</p>
    </div>
    <div className="footer-section">
      <h3>Contact</h3>
      <p>Name: Mohammad Raza</p>
      <p>Email: support@R2P.com</p>
      <p>Phone: +91 705075191</p>
    </div>
    <div className="footer-section">
      <h3>Follow Us</h3>
      <p>Instagram | Facebook | Twitter</p>
    </div>
    <div className="footer-section">
      <h3>Useful Links</h3>
      <p>FAQs | Shipping Info | Returns Policy</p>
    </div>
  </div>
);

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [netBanking, setNetBanking] = useState('');

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (selectedMethod === 'Credit Card') {
      const { cardNumber, expiryDate, cvv } = cardDetails;
      if (!/^[0-9]{16}$/.test(cardNumber)) {
        alert('Enter a valid 16-digit card number.');
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        alert('Enter a valid expiry date (MM/YY).');
        return;
      }
      if (!/^[0-9]{3,4}$/.test(cvv)) {
        alert('Enter a valid CVV.');
        return;
      }
    }

    if (selectedMethod === 'UPI' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+$/.test(upiId)) {
      alert('Enter a valid UPI ID (e.g., yourname@upi).');
      return;
    }

    if (selectedMethod === 'PayPal' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
      alert('Enter a valid PayPal email.');
      return;
    }

    if (selectedMethod === 'Net Banking' && !netBanking) {
      alert('Please select a bank.');
      return;
    }

    alert(`Payment successful using ${selectedMethod}!`);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="payment-container">
        <h1>Secure Payment</h1>
        <div className="payment-options">
          <label className="option">
            <input type="radio" value="Credit Card" checked={selectedMethod === 'Credit Card'} onChange={() => setSelectedMethod('Credit Card')} />
            Credit Card
          </label>
          {selectedMethod === 'Credit Card' && (
            <div className="card-details">
              <input type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleCardChange} />
              <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={cardDetails.expiryDate} onChange={handleCardChange} />
              <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleCardChange} />
            </div>
          )}
          <label className="option">
            <input type="radio" value="UPI" checked={selectedMethod === 'UPI'} onChange={() => setSelectedMethod('UPI')} />
            UPI
          </label>
          {selectedMethod === 'UPI' && (
            <input type="text" placeholder="Enter UPI ID (e.g., yourname@upi)" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="upi-input" />
          )}
          <label className="option">
            <input type="radio" value="PayPal" checked={selectedMethod === 'PayPal'} onChange={() => setSelectedMethod('PayPal')} />
            PayPal
          </label>
          {selectedMethod === 'PayPal' && (
            <input type="email" placeholder="Enter PayPal Email" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} className="paypal-input" />
          )}
          <label className="option">
            <input type="radio" value="Net Banking" checked={selectedMethod === 'Net Banking'} onChange={() => setSelectedMethod('Net Banking')} />
            Net Banking
          </label>
          {selectedMethod === 'Net Banking' && (
            <select value={netBanking} onChange={(e) => setNetBanking(e.target.value)} className="bank-select">
              <option value="">Select Your Bank</option>
              <option value="SBI">SBI</option>
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
              <option value="Axis Bank">Axis Bank</option>
            </select>
          )}
          <label className="option">
            <input type="radio" value="Cash on Delivery" checked={selectedMethod === 'Cash on Delivery'} onChange={() => setSelectedMethod('Cash on Delivery')} />
            Cash on Delivery
          </label>
        </div>
        <button className="pay-now-btn" onClick={handlePayment}>Pay Now</button>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
