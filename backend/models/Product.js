
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
  // Add other fields as necessary
}, {
  // Other model options
});

module.exports = Product;



// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_URI, {
//   dialect: 'postgres',
// });

// const connectPostgres = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('PostgreSQL connected successfully');
//   } catch (error) {
//     console.error('PostgreSQL connection failed', error);
//   }
// };

// module.exports = { sequelize, connectPostgres };
