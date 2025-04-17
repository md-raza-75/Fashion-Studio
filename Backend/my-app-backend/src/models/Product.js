const pool = require('../config/db');

// Create product
async function createProduct(name, category, price, img, description, stock) {
  try {
    const query = `
      INSERT INTO products (name, category, price, img, description, stock)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, category, price, img, description, stock];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// Get all products
async function getAllProducts() {
  try {
    const query = 'SELECT * FROM products;';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
}

// Get products by category
async function getProductsByCategory(category) {
  try {
    const query = 'SELECT * FROM products WHERE category = $1;';
    const values = [category];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
}

// Update product
async function updateProduct(id, data) {
  try {
    const { name, category, price, img, description, stock } = data;
    const query = `
      UPDATE products
      SET name = $1, category = $2, price = $3, img = $4, description = $5, stock = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [name, category, price, img, description, stock, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// Delete product
async function deleteProduct(id) {
  try {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *;';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct
};
