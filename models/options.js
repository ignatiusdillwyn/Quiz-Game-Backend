'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Options.belongsTo(models.Questions, { foreignKey: "question_id" });
    }
  }
  Options.init({
    option_1: DataTypes.STRING,
    option_2: DataTypes.STRING,
    option_3: DataTypes.STRING,
    option_4: DataTypes.STRING,
    correct_answer: DataTypes.STRING,
    question_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Options',
  });
  return Options;
};