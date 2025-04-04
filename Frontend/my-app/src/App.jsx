import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FashionCollection from './components/FashionCollection.jsx';
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Product from './components/Product.jsx';
import Product2 from './components/Product2.jsx'; // Import Product2 component
import Product3 from './components/Product3.jsx'; 
import ProfilePage from "./components/ProfilePage.jsx";
import Payment from "./components/Payment.jsx";
import Settings from "./components/Settings.jsx";
import Admin from "./Admin/Admin.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FashionCollection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product2" element={<Product2 />} />
        <Route path="/product3" element={<Product3 />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/CheckOut" element={<Payment/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Order" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
