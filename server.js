// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Define your custom API route
  server.get('/api/products', (req, res) => {
    const products = [
      { id: 1, name: 'Gold Ring', price: 199.99 },
      { id: 2, name: 'Silver Necklace', price: 99.99 },
    ];
    res.json(products);
  });

  // Handle all other routes with Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
});