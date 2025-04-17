import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function FashionCollection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    "Long Kurti": [],
    "Short Kurti": [],
    "Saree": [],
    "Gown": [],
    "Jewellery": []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      
      // Organize products by category
      const categorizedProducts = response.data.reduce((acc, product) => {
        // Ensure all category keys exist
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {
        "Long Kurti": [],
        "Short Kurti": [],
        "Saree": [],
        "Gown": [],
        "Jewellery": []
      });
      
      setProducts(categorizedProducts);
      console.log("Fetched products:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (item) => {
    console.log(`${item.name} added to cart`);
    // Store the selected item in localStorage or context if needed
    localStorage.setItem('selectedProduct', JSON.stringify(item));
    // Navigate to the products page
    navigate('/products');
  };

  const renderProducts = (title, data) => (
    <section className="py-12" key={title}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <a href="#" className="text-pink-600 hover:underline">See all</a>
        </div>
        {data.length === 0 ? (
          <p className="text-center text-gray-500">No products available in this category</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((item) => (
              <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <img 
                  className="w-full h-64 object-cover" 
                  src={item.img.startsWith('http') ? item.img : `/images/${item.img}`} 
                  alt={item.name}
                  onError={(e) => {
                    console.error("Image failed to load:", item.img);
                    e.target.src = '/images/default-product.jpg'; // Fallback image
                  }}
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-gray-600">₹ {item.price}</p>
                  <button 
                    className="mt-4 bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const getCategoryImage = (category) => {
    const categoryImages = {
      "Long Kurti": "p1.jpg",
      "Short Kurti": "k2.jpg",
      "Saree": "s1.jpg",
      "Gown": "k3.jpg",
      "Jewellery": "s8.jpg"
    };
    return `/images/${categoryImages[category] || 'default-category.jpg'}`;
  };

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
            <img 
              key={i} 
              className="w-40 h-40 object-cover rounded-lg shadow-lg" 
              src={`/images/${img}`} 
              alt={`Model ${i + 1}`}
              onError={(e) => {
                e.target.src = '/images/default-model.jpg';
              }}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {Object.keys(products).map((category) => (
            <div key={category} className="text-center bg-white shadow-lg p-4 rounded-lg w-40 hover:shadow-2xl transition">
              <img 
                className="w-32 h-32 object-cover rounded-md mx-auto" 
                src={getCategoryImage(category)} 
                alt={category}
                onError={(e) => {
                  e.target.src = '/images/default-category.jpg';
                }}
              />
              <span className="block mt-2 font-semibold text-gray-700">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Collections */}
      {Object.entries(products).map(([category, items]) => (
        renderProducts(`${category} Collection`, items)
      ))}

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
