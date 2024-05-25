
// sets up a connection to a PostgreSQL database using Sequelize, an ORM (Object-Relational Mapping) for Node.js applications
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

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

module.exports = { connectPostgres, sequelize };
