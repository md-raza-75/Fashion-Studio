import React, { useState } from 'react';

const Navbar = () => (
    <div className="bg-white p-4 flex justify-between items-center border-b-4 border-red-500">
        <div className="text-red-500 text-xl font-bold">R2P</div>
        <div className="space-x-4">
            <a href="/" className="text-gray-800 font-bold hover:text-red-500">Home</a>
            <a href="#" className="text-gray-800 font-bold hover:text-red-500">Products</a>
            <a href="/Profile" className="text-gray-800 font-bold hover:text-red-500">Profile</a>
        </div>
    </div>
);

const ProductPage = () => {
    const [cartVisible, setCartVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (operation) => {
        setQuantity((prev) => (operation === 'increment' ? prev + 1 : Math.max(1, prev - 1)));
    };

    return (
        <div className="flex flex-col items-center py-10 bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg flex max-w-5xl w-full overflow-hidden">
                <div className="flex-1 bg-pink-200 flex justify-center items-center p-4">
                    <img src="/images/s1.jpg" alt="Black Long Kurti" className="max-w-80 rounded-lg" />
                </div>
                <div className="flex-1.2 p-6 bg-pink-300">
                    <h2 className="text-2xl font-bold text-gray-800">Black Long Kurti</h2>
                    <p className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐ 3</p>
                    <p className="text-xl font-bold text-red-500">₹1,299.00 <span className="line-through text-gray-500">₹1,859.00</span></p>
                    <p className="bg-red-500 text-white px-2 py-1 rounded-md font-bold">SAVE 30%</p>
                    <p className="text-gray-600 mt-2">24 people are viewing this right now</p>
                    <p className="text-red-500 font-bold mt-1">Only 9 items left in stock!</p>
                    <div className="mt-4 flex items-center space-x-3">
                        <label className="text-gray-700">Quantity:</label>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => handleQuantityChange('decrement')} className="bg-gray-800 text-white px-2 py-1 rounded">-</button>
                            <input type="number" value={quantity} readOnly className="w-12 text-center border border-gray-300" />
                            <button onClick={() => handleQuantityChange('increment')} className="bg-gray-800 text-white px-2 py-1 rounded">+</button>
                        </div>
                    </div>
                    <button className="bg-red-500 text-white w-full py-3 rounded-lg mt-5 font-bold hover:bg-red-700" onClick={() => setCartVisible(true)}>Add to Cart</button>
                </div>
            </div>

            {cartVisible && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 transition-transform transform translate-x-0">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-bold">Shopping Cart</h2>
                        <button className="text-red-500 font-bold" onClick={() => setCartVisible(false)}>X</button>
                    </div>
                    <p className="text-gray-600 mt-2">Buy <strong>$122.35</strong> More And Get <strong>Free Shipping</strong></p>
                    <div className="flex items-center mt-4">
                        <img src="/images/s1.jpg" alt="Green Long Kurti" className="w-2 h-2 rounded-lg" />
                        <div className="ml-4">
                            <p className="font-semibold">Green Long Kurti</p>
                            <p className="text-gray-500">Color: Green</p>
                            <p className="text-red-500 font-bold">₹1,250.00</p>
                            <div className="flex items-center mt-2">
                                <button className="bg-gray-800 text-white px-2 py-1 rounded">-</button>
                                <input type="number" value={quantity} readOnly className="w-12 text-center border" />
                                <button className="bg-gray-800 text-white px-2 py-1 rounded">+</button>
                            </div>
                        </div>
                    </div>
                    <p className="font-bold mt-4">Subtotal: ₹{(1250 * quantity).toFixed(2)}</p>
                    <button className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-700 mt-2">Checkout</button>
                </div>
            )}
        </div>
    );
};

const Footer = () => (
    <div className="bg-gray-800 text-white p-6 flex justify-around mt-10">
        <div>
            <h3 className="font-bold">About</h3>
            <p>R2P offers the latest trends in fashion for all ages.</p>
        </div>
        <div>
            <h3 className="font-bold">Contact</h3>
            <p>Name: Mohammad Raza</p>
            <p>Email: support@R2P.com</p>
            <p>Phone: +91 705075191</p>
        </div>
        <div>
            <h3 className="font-bold">Follow Us</h3>
            <p>Instagram | Facebook | Twitter</p>
        </div>
        <div>
            <h3 className="font-bold">Useful Links</h3>
            <p>FAQs | Shipping Info | Returns Policy</p>
        </div>
    </div>
);

const App = () => (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
        <ProductPage />
        <Footer />
    </div>
);

export default App;