//sets up an Express.js server for Node.js application
const express = require('express');
const bodyParser = require('body-parser');
const { connectPostgres } = require('./config');

const app = express();

// Connect to PostgreSQL
connectPostgres();

app.use(bodyParser.json());

// Define routes
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
