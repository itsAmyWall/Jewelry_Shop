const dotenv = require('dotenv');

// Load environment variables from .env file
console.log('Before loading environment variables');
dotenv.config();
console.log('After loading environment variables');

const express = require('express');
const next = require('next');
const { connectPostgres } = require('./config/database');
const { syncDatabase } = require('./models/index');
const Product = require('./models/Product');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



const port = process.env.PORT || 5000;

app.prepare().then(() => {
  const server = express();

  // Connect to PostgreSQL
  connectPostgres();

  // Sync the database
  syncDatabase();

  // Define your API routes
  server.get('/api/products', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  server.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  // Use Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error preparing Next.js app:', err);
});

