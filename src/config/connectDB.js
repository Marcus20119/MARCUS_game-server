const { Sequelize } = require('sequelize');
// import Sequelize from 'sequelize';

const sequelize = new Sequelize('game', 'root', null, {
  host: 'https://marcus-game-server.onrender.com',
  dialect: 'mysql',
  // Ngăn không cho in ra lệnh query
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
