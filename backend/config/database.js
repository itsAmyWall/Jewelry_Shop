const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

console.log('DB_URI:', process.env.DB_URI);  // Added this line to check if DB_URI is loaded

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error('PostgreSQL connection failed', error);
  }
};

module.exports = { sequelize, connectPostgres };
