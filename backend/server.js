const express = require('express');
const path = require('path');
const { connectPostgres } = require('./config/database');
const { syncDatabase, Product } = require('./models');

const app = express();
const port = process.env.PORT || 5000;

// Connect to PostgreSQL
connectPostgres();

// Sync Database
syncDatabase();

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Define your API routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Handle the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend','pages', 'index.js'));
});

// Fallback for all other routes
app.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
