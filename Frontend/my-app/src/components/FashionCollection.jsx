import React from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import Navbar from "../components/Navbar";
import longKurtis from "../data/longkurtis";
import shortKurtis from "../data/shortKurtis";
import sarees from "../data/sarees";

export default function FashionCollection() {
  const navigate = useNavigate();

  // Separate Add to Cart Handlers
  const handleAddToCartSaree = (item) => {
    console.log("Saree added to cart:", item);
    navigate("/product2");
  };

  const handleAddToCartShortKurti = (item) => {
    console.log("Short Kurti added to cart:", item);
    navigate("/product3");
  };

  const handleAddToCartLongKurti = (item) => {
    console.log("Long Kurti added to cart:", item);
    navigate("/product");
  };

  const renderProducts = (title, data, addToCartHandler) => (
    <section className="collection-section">
      <div className="section-header">
        <h2>{title}</h2>
        <a href="#">See all</a>
      </div>

      <div className="product-grid">
        {data.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.img} alt={item.name} />
            <div className="product-info">
              <h3>{item.name}</h3>
              <p>₹ {item.price}.00</p>
              <button
                className="add-to-cart"
                onClick={() => addToCartHandler(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="fashion-collection">
      <Navbar />

      <section className="hero-section">
        <h2>NEW R2P</h2>
        <h1>FASHION COLLECTION</h1>
        <button className="shop-now">SHOP NOW</button>
        <div className="hero-images">
          {["model1.jpg", "model2.jpg", "model3.jpg", "model4.jpg", "p1.jpg"].map((img, i) => (
            <img key={i} src={`/images/${img}`} alt={`Model ${i + 1}`} />
          ))}
        </div>
      </section>

      <section
        className="category-section"
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        {[
          { img: "/images/p1.jpg", label: "Long Kurti" },
          { img: "/images/k2.jpg", label: "Short Kurti" },
          { img: "/images/s1.jpg", label: "Saree" },
          { img: "/images/k3.jpg", label: "Gown" },
          { img: "/images/s8.jpg", label: "Jewellery" },
        ].map((item, index) => (
          <div
            key={index}
            className="category-card"
            style={{
              textAlign: "center",
              border: "2px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              width: "150px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={item.img}
              alt={item.label}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <span style={{ display: "block", marginTop: "8px", fontWeight: "bold" }}>
              {item.label}
            </span>
          </div>
        ))}
      </section>

      <div className="fashion-collection">
        {renderProducts("Long Kurti Collection", longKurtis, handleAddToCartLongKurti)}
        {renderProducts("Short Kurti Collection", shortKurtis, handleAddToCartShortKurti)}
        {renderProducts("Saree Collection", sarees, handleAddToCartSaree)}
      </div>

      <section className="about-section">
        <h2>Our Premium Fashion Collection</h2>
        <p>
          Our exclusive designer sarees and gowns are crafted from luxurious
          fabrics with intricate embroidery and modern silhouettes. Each piece
          is a fusion of tradition and contemporary style, perfect for weddings,
          festive events, and special occasions. Discover fashion that blends
          elegance with comfort, ensuring you stand out with timeless beauty and
          confidence.
        </p>
      </section>
    </div>
  );
}
