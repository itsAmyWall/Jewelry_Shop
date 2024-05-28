const express = require('express');
const path = require('path');
const { connectPostgres } = require('./config/database'); // Adjust the path if necessary

const app = express();
const port = process.env.PORT || 5000;

// Connect to PostgreSQL
connectPostgres();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define your API routes
app.get('/api/products', (req, res) => {
    // Logic to fetch all products from the database
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    // Logic to fetch product by ID from the database
});

// Handle the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Fallback for all other routes
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
