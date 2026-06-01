'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaderbord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leaderbord.belongsTo(models.UserParticipants, { foreignKey: "userParticipant_id" });
    }
  }
  Leaderbord.init({
    userParticipant_id: DataTypes.INTEGER,
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Leaderbord',
  });
  return Leaderbord;
};