'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoriGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoriGame.init({
    player_one: DataTypes.STRING,
    player_two: DataTypes.STRING,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HistoriGame',
  });
  return HistoriGame;
};