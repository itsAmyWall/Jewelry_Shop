const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inStock: {  // New field for stock quantity
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Set a default value of 0 if not provided
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Product;





// const Product = sequelize.define('Product', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   // Add other fields as necessary
// }, {
//   // Other model options
// });

// module.exports = Product;



