const Product = require('./Product');

const syncDatabase = async () => {
  try {
    await Product.sync({ force: true }); // Use { force: true } only in development to reset the database
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Database sync failed', error);
  }
};

module.exports = { syncDatabase };
