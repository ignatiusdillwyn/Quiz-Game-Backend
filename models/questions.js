'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsTo(models.UserPostQuestions, { foreignKey: "user_id" });
      Questions.hasOne(models.Options, { foreignKey: "question_id" });
    }
  }
  Questions.init({
    question_text: DataTypes.STRING,
    correct_answer: DataTypes.STRING,
    score: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};