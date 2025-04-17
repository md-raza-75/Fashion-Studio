// src/config/config.js
require('dotenv').config(); // Load environment variables from .env

const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'fashion_studio',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'mdraza7586'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fashion-studio-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  server: {
    port: process.env.PORT || 3000,
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174']
    }
  },
};

module.exports = config;
