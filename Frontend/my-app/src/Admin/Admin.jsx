import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: "Stylish Kurti", category: "Clothing", price: "₹2000", stock: "In Stock" },
    { id: 2, name: "Elegant Saree", category: "Clothing", price: "₹3500", stock: "Out of Stock" },
    { id: 3, name: "Party Gown", category: "Clothing", price: "₹5000", stock: "In Stock" },
    { id: 4, name: "Gold Necklace", category: "Jewellery", price: "₹120000", stock: "Limited Stock" },
    { id: 5, name: "Silver Earrings", category: "Jewellery", price: "₹2800", stock: "In Stock" },
    { id: 6, name: "Designer Lehenga", category: "Clothing", price: "₹8000", stock: "In Stock" },
    { id: 7, name: "Casual Top", category: "Clothing", price: "₹1200", stock: "In Stock" },
    { id: 8, name: "Traditional Bangles", category: "Jewellery", price: "₹1500", stock: "Limited Stock" },
    { id: 9, name: "Bridal Dress", category: "Clothing", price: "₹25000", stock: "Out of Stock" },
    { id: 10, name: "Fancy Bracelet", category: "Jewellery", price: "₹2000", stock: "In Stock" }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdate = () => {
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center bg-blue-700 p-5 shadow-lg">
        <div className="text-white text-3xl font-bold cursor-pointer">Admin Dashboard</div>
        <nav className="flex space-x-6">
          <Link to="/" className="text-white font-semibold hover:underline">Home</Link>
          <Link to="/products" className="text-white font-semibold hover:underline">Products</Link>
          <Link to="/add-product" className="text-white font-semibold hover:underline">Add Product</Link>
        </nav>
        <Link to="/profile" className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200">Profile</Link>
      </header>

      <div className="flex flex-grow items-center justify-center px-6 py-10">
        <div className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-5">Admin Panel</h1>
          <p className="text-center text-gray-500 mb-6">Manage all your products and projects here.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="p-4">ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-100 text-center">
                    <td className="p-4 font-semibold">{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className="text-green-600 font-semibold">{product.price}</td>
                    <td>{product.stock}</td>
                    <td className="flex justify-center gap-2 py-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600" onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingProduct && (
            <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="block w-full p-2 border rounded mb-3" placeholder="Product Name" />
              <input type="text" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="block w-full p-2 border rounded mb-3" placeholder="Product Category" />
              <input type="text" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="block w-full p-2 border rounded mb-3" placeholder="Product Price" />
              <input type="text" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} className="block w-full p-2 border rounded mb-3" placeholder="Product Stock" />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600" onClick={handleUpdate}>Save</button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/add-product" className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600">Add New Product</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
