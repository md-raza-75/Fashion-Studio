import React, { useState } from 'react';
import './App.css';

function App() {
    const [cartVisible, setCartVisible] = useState(false);

    return (
        <div className="app-container">
            {/* Navbar */}
            <nav className="navbar">
                <button className="back-button">&#8592;</button>
                <ul>
                    <li>Home</li>
                    <li>Kurti</li>
                    <li>Gown</li>
                    <li>Saree</li>
                    <li>Jewellery</li>
                </ul>
                <button className="profile-button" onClick={() => setCartVisible(!cartVisible)}>🛒</button>
            </nav>

            {/* Product Details */}
            <div className="product-details">
                <img src="/path-to-image.jpg" alt="Green Long Kurti" />
                <div className="details">
                    <h1>Green Long Kurti</h1>
                    <p>Color: Green</p>
                    <p>₹1,250.00</p>
                    <button>Add to Cart</button>
                </div>
            </div>

            {/* Shopping Cart */}
            {cartVisible && (
                <div className="shopping-cart">
                    <h2>Shopping Cart</h2>
                    <p>Subtotal: ₹1,250.00</p>
                    <button>Checkout</button>
                    <button onClick={() => setCartVisible(false)}>Close</button>
                </div>
            )}

            {/* Footer */}
            <footer>
                <div className="footer-section">
                    <h3>About</h3>
                    <p>About Us</p>
                    <p>Our Story</p>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Address: Mohammadpur, Dhaka</p>
                    <p>Phone: +8801234567890</p>
                </div>
                <div className="footer-section">
                    <h3>Subscribe</h3>
                    <input type="email" placeholder="Enter Your Email Address" />
                    <button>Subscribe</button>
                </div>
            </footer>
        </div>
    );
}

export default App;
