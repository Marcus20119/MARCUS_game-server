'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameHistory.init({
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    game: DataTypes.STRING,
    nPlay: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameHistory',
  });
  return GameHistory;
};