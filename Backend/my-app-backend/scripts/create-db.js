const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
  // Connect to default postgres database
  const client = new Client({
    user: 'postgres',
    host: 'localhost', 
    database: 'postgres',  // Connect to default database
    password: 'mdraza7586',
    port: 5432
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'fashion_studio';"
    );

    if (result.rowCount === 0) {
      console.log('Creating fashion_studio database...');
      // Create database
      await client.query('CREATE DATABASE fashion_studio;');
      console.log('Database created successfully');
    } else {
      console.log('Database fashion_studio already exists.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

createDatabase(); 