'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tictactoe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tictactoe.init(
    {
      nWinX: DataTypes.INTEGER,
      nWinO: DataTypes.INTEGER,
      nLose: DataTypes.INTEGER,
      nPlay: DataTypes.INTEGER,
      nDraw: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tictactoe',
    }
  );
  return Tictactoe;
};
