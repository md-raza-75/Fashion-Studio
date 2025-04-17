import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Long Kurti",
    price: "",
    img: "",
    description: "",
    stock: "In Stock"
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      
      // Ensure the image has the correct format
      let imgPath = newProduct.img;
      if (!imgPath.startsWith('http') && !imgPath.startsWith('/images/')) {
        imgPath = imgPath.includes('/') ? imgPath : `/images/${imgPath}`;
      }
      
      const productData = {
        ...newProduct,
        img: imgPath,
        price: parseFloat(newProduct.price)
      };
      
      console.log("Submitting product:", productData);
      
      await axios.post("http://localhost:3000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNewProduct({
        name: "",
        category: "Long Kurti",
        price: "",
        img: "",
        description: "",
        stock: "In Stock"
      });
      
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error adding product: ${error.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      // Ensure the image has the correct format
      let imgPath = editingProduct.img;
      if (!imgPath.startsWith('http') && !imgPath.startsWith('/images/')) {
        imgPath = imgPath.includes('/') ? imgPath : `/images/${imgPath}`;
      }
      
      const productData = {
        ...editingProduct,
        img: imgPath,
        price: parseFloat(editingProduct.price)
      };
      
      await axios.put(`http://localhost:3000/api/products/${editingProduct.id}`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`Error updating product: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(`Error deleting product: ${error.message}`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center bg-blue-700 p-5 shadow-lg">
        <div className="text-white text-3xl font-bold cursor-pointer">Admin Dashboard</div>
        <nav className="flex space-x-6">
          <Link to="/" className="text-white font-semibold hover:underline">Home</Link>
          <Link to="/products" className="text-white font-semibold hover:underline">Products</Link>
        </nav>
        <Link to="/profile" className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200">Profile</Link>
      </header>

      <div className="flex flex-grow items-start justify-center px-6 py-10">
        <div className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-5">Admin Panel</h1>
          
          {/* Add Product Form */}
          <div className="mb-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="p-2 border rounded"
                required
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              >
                <option value="Long Kurti">Long Kurti</option>
                <option value="Short Kurti">Short Kurti</option>
                <option value="Saree">Saree</option>
                <option value="Gown">Gown</option>
                <option value="Jewellery">Jewellery</option>
              </select>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="img"
                value={newProduct.img}
                onChange={handleInputChange}
                placeholder="Image filename (e.g., p1.jpg, k2.jpg, s1.jpg)"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="p-2 border rounded col-span-2"
              />
              <select
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Limited Stock">Limited Stock</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="p-4">Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-100 text-center">
                    <td className="p-4">{product.name}</td>
                    <td>{product.category}</td>
                    <td className="text-green-600 font-semibold">₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td className="flex justify-center gap-2 py-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <select
                    name="category"
                    value={editingProduct.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Long Kurti">Long Kurti</option>
                    <option value="Short Kurti">Short Kurti</option>
                    <option value="Saree">Saree</option>
                    <option value="Gown">Gown</option>
                    <option value="Jewellery">Jewellery</option>
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="img"
                    value={editingProduct.img}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editingProduct.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <select
                    name="stock"
                    value={editingProduct.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                  </select>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
