const dotenv = require('dotenv');
console.log('Before loading environment variables');
dotenv.config();
console.log('After loading environment variables');

const express = require('express');
const next = require('next');
const { connectPostgres } = require('./config/database');
const { syncDatabase } = require('./models/index');
const Product = require('./models/Product'); // Only one Product import is needed

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './frontend' });
const handle = app.getRequestHandler();

const port = process.env.PORT || 5000;

app.prepare().then(() => {
  const server = express();

  // Connect to PostgreSQL
  connectPostgres();

  // Sync the database and insert sample data once sync is complete
  syncDatabase()
    .then(() => {
      console.log('Database synced successfully');

      // Insert sample data after sync completes
      insertSampleData();
    })
    .catch(err => {
      console.error('Error syncing database:', err);
    });

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

async function insertSampleData() {
  try {
    await Product.create({
      name: 'Gold Necklace',
      price: 499.99,
      imageUrl: '/ring.jpg',  // Updated image URL
      inStock: 10,
    });
    await Product.create({
      name: 'Silver Ring',
      price: 149.99,
      imageUrl: '/ring.jpg',  // Updated image URL
      inStock: 20,
    });
    await Product.create({
      name: 'Diamond Earrings',
      price: 999.99,
      imageUrl: '/ring.jpg',  // Updated image URL
      inStock: 5,
    });
    await Product.create({
      name: 'Emerald Bracelet',
      price: 799.99,
      imageUrl: '/ring.jpg',  // New product image URL
      inStock: 8,
    });
    await Product.create({
      name: 'Platinum Watch',
      price: 1299.99,
      imageUrl: '/ring.jpg',  // New product image URL
      inStock: 6,
    });
    await Product.create({
      name: 'Rose Gold Pendant',
      price: 399.99,
      imageUrl: '/ring.jpg',  // New product image URL
      inStock: 12,
    });
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}
