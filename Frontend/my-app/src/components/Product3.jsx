import React, { useState } from 'react';
import '../Product.css'; // Ensure the path is correct

const Navbar = () => (
    <div className="navbar">
        <div className="logo">R2P</div>
        <div className="nav-links">
            <a href="/">Home</a>
            <a href="#">Products</a>
            <a href="/Profile">Profile</a>
        </div>
    </div>
);

const ProductPage = () => {
    const [cartVisible, setCartVisible] = useState(false); // Handle cart visibility
    const [quantity, setQuantity] = useState(1); // Handle quantity for the product

    // Handle quantity change
    const handleQuantityChange = (operation) => {
        if (operation === 'increment') {
            setQuantity(quantity + 1);
        } else if (operation === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="left-section">
                    <div className="product-image">
                        <img src="/images/p10.jpg" alt="Black Long Kurti" />
                    </div>
                </div>

                <div className="right-section">
                    <h2>Black Long Kurti</h2>
                    <div className="rating">⭐⭐⭐⭐⭐ 3</div>
                    <p className="price">
                        <span className="current-price">₹1,299.00</span>
                        <span className="original-price">₹1,859.00</span>
                        <span className="discount">SAVE 30%</span>
                    </p>

                    <div className="viewers">24 people are viewing this right now</div>
                    <div className="sale-timer">Hurry up! Sale ends in: 00 : 05 : 59 : 47</div>
                    <p className="stock-info">Only 9 item(s) left in stock!</p>

                    <div className="size-options">
                        <label>Size:</label>
                        <div className="sizes">
                            <button>M</button>
                            <button>L</button>
                            <button>XL</button>
                            <button>XXL</button>
                        </div>
                    </div>

                    <div className="color-options">
                        <label>Color:</label>
                        <div className="colors">
                            <div className="color blue"></div>
                            <div className="color black"></div>
                            <div className="color pink"></div>
                        </div>
                    </div>

                    <div className="quantity-section">
                        <label>Quantity:</label>
                        <div className="quantity">
                            <button onClick={() => handleQuantityChange('decrement')}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={() => handleQuantityChange('increment')}>+</button>
                        </div>
                    </div>

                    <button className="add-to-cart" onClick={() => setCartVisible(true)}>Add to Cart</button>

                    <div className="extra-options">
                        <span>🔄 Compare</span>
                        <span>❓ Ask a question</span>
                        <span>📤 Share</span>
                    </div>

                    <div className="delivery-info">
                        Estimated Delivery: Jul 30 - Aug 03<br />
                        Free Shipping & Returns: On all orders over $75
                    </div>

                    <div className="payment-icons">
                        <img src="/images/payment-icons.png" alt="Payment Methods" />
                    </div>
                </div>
            </div>

            {cartVisible && (
                <div className="shopping-cart">
                    <div className="cart-header">
                        <button className="back-icon" onClick={() => setCartVisible(false)}>←</button>
                        <h2>Shopping Cart</h2>
                    </div>
                    <p>Buy <strong>$122.35</strong> More And Get <strong>Free Shipping</strong></p>
                    <div className="cart-item">
                        <img src="/images/s1.jpg" alt="Green Long Kurti" />
                        <div>
                            <p>Green Long Kurti</p>
                            <p>Color: Green</p>
                            <p>₹1,250.00</p>
                            <div className="quantity">
                                <button>-</button>
                                <input type="number" value={quantity} readOnly />
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-option">
                        <input type="checkbox" /> For ₹1,250.00 Please Wrap The Product
                    </div>
                    <p className="subtotal">Subtotal: ₹{1250 * quantity}</p>
                    <div className="checkout-buttons">
                        <button className="checkout-btn">Checkout</button>
                    </div>
                    <button className="view-cart">View Cart</button>
                </div>
            )}
        </div>
    );
};

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

const App = () => (
    <div>
        <Navbar />
        <ProductPage />
        <Footer />
    </div>
);

export default App;
