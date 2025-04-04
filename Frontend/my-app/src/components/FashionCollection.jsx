import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import longKurtis from "../data/longkurtis";
import shortKurtis from "../data/shortKurtis";
import sarees from "../data/sarees";

export default function FashionCollection() {
  const navigate = useNavigate();

  const handleAddToCart = (item, route) => {
    console.log(`${item.name} added to cart`);
    navigate(route);
  };

  const renderProducts = (title, data, route) => (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <a href="#" className="text-pink-600 hover:underline">See all</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img className="w-full h-64 object-cover" src={item.img} alt={item.name} />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-gray-600">₹ {item.price}.00</p>
                <button 
                  className="mt-4 bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition"
                  onClick={() => handleAddToCart(item, route)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <h2 className="text-lg uppercase tracking-wide">NEW R2P</h2>
        <h1 className="text-5xl font-bold my-4">FASHION COLLECTION</h1>
        <button className="mt-4 bg-white text-pink-600 py-3 px-8 rounded-full font-semibold shadow-md hover:bg-gray-200 transition">SHOP NOW</button>
        <div className="flex justify-center mt-8 gap-4">
          {["model1.jpg", "model2.jpg", "model3.jpg"].map((img, i) => (
            <img key={i} className="w-40 h-40 object-cover rounded-lg shadow-lg" src={`/images/${img}`} alt={`Model ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {[{ img: "/images/p1.jpg", label: "Long Kurti" },
            { img: "/images/k2.jpg", label: "Short Kurti" },
            { img: "/images/s1.jpg", label: "Saree" },
            { img: "/images/k3.jpg", label: "Gown" },
            { img: "/images/s8.jpg", label: "Jewellery" }].map((item, index) => (
            <div key={index} className="text-center bg-white shadow-lg p-4 rounded-lg w-40 hover:shadow-2xl transition">
              <img className="w-32 h-32 object-cover rounded-md mx-auto" src={item.img} alt={item.label} />
              <span className="block mt-2 font-semibold text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Collections */}
      {renderProducts("Long Kurti Collection", longKurtis, "/product")}
      {renderProducts("Short Kurti Collection", shortKurtis, "/product3")}
      {renderProducts("Saree Collection", sarees, "/product2")}

      {/* About Section */}
      <section className="bg-pink-100 py-16 text-center rounded-xl mx-6 shadow-xl my-12">
        <h2 className="text-4xl font-bold text-pink-700 mb-4">Our Premium Fashion Collection</h2>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Our exclusive designer sarees and gowns are crafted from luxurious fabrics with intricate embroidery and modern silhouettes. Each piece blends tradition with contemporary style, perfect for weddings, festive events, and special occasions.
        </p>
      </section>
    </div>
  );
}