
// This code sets up a connection to a PostgreSQL database using Sequelize, an ORM (Object-Relational Mapping) for Node.js applications
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize with database connection parameters from environment variables
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
});

// Function to establish connection to PostgreSQL database
const connectPostgres = async () => {
  try {
    // Authenticate the connection to PostgreSQL database
    await sequelize.authenticate();
    // Log a success message if connection is established
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    // Log an error message if connection fails
    console.error('PostgreSQL connection failed', error);
  }
};

// Export the connection function and Sequelize instance for external use
module.exports = { connectPostgres, sequelize };

