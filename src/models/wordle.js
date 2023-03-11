'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wordle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wordle.init(
    {
      userId: DataTypes.INTEGER,
      nWinR1: DataTypes.INTEGER,
      nWinR2: DataTypes.INTEGER,
      nWinR3: DataTypes.INTEGER,
      nWinR4: DataTypes.INTEGER,
      nWinR5: DataTypes.INTEGER,
      nWinR6: DataTypes.INTEGER,
      nLose: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Wordle',
    }
  );
  return Wordle;
};
