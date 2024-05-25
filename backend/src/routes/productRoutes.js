// defines a router for handling HTTP requests related to products in a RESTful API using Express.js, a web application framework for Node.js.
const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
