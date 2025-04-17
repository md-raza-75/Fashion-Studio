const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Read SQL script file
    const sqlFilePath = path.join(__dirname, '../src/config/init-db.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL script
    await pool.query(sqlScript);
    console.log('Database initialized successfully!');
    
    // Insert sample data (optional)
    await insertSampleData();
    
    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

async function insertSampleData() {
  try {
    console.log('Inserting sample data...');
    
    // Sample data for products
    const products = [
      {
        name: 'Elegant Black Long Kurti',
        category: 'Long Kurti',
        price: 1299.00,
        img: 'p1.jpg',
        description: 'Elegant black long kurti with intricate embroidery.',
        stock: 'In Stock'
      },
      {
        name: 'Floral Short Kurti',
        category: 'Short Kurti',
        price: 999.00,
        img: 'k2.jpg',
        description: 'Beautiful floral short kurti for casual wear.',
        stock: 'In Stock'
      },
      {
        name: 'Designer Red Saree',
        category: 'Saree',
        price: 2499.00,
        img: 's1.jpg',
        description: 'Designer red saree with gold border.',
        stock: 'Limited Stock'
      },
      {
        name: 'Wedding Gown',
        category: 'Gown',
        price: 5999.00,
        img: 'k3.jpg',
        description: 'Elegant wedding gown with intricate details.',
        stock: 'In Stock'
      },
      {
        name: 'Gold Necklace Set',
        category: 'Jewellery',
        price: 15999.00,
        img: 's8.jpg',
        description: 'Beautiful gold necklace set with earrings.',
        stock: 'Limited Stock'
      }
    ];
    
    // Insert each product
    for (const product of products) {
      const query = `
        INSERT INTO products (name, category, price, img, description, stock)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
      `;
      const values = [
        product.name,
        product.category,
        product.price,
        product.img,
        product.description,
        product.stock
      ];
      
      await pool.query(query, values);
    }
    
    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
    throw error;
  }
}

// Run the initialization
initializeDatabase(); 