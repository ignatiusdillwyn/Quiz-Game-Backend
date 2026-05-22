'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPostQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPostQuestions.hasMany(models.Questions, { foreignKey: "user_id" });
    }
  }
  UserPostQuestions.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_email_constraint',
        msg: 'Email is already registered'  // ← pesan error di sini
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is invalid"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "Password must be at least 8 characters"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Password is required"
        },
        // Custom validator: harus mengandung huruf dan angka
        isValidPassword(value) {
          if (!/[a-zA-Z]/.test(value)) {
            throw new Error("Password must contain at least one letter");
          }
          if (!/[0-9]/.test(value)) {
            throw new Error("Password must contain at least one number");
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_username_constraint',
        msg: 'Username is already used'  // ← pesan error di sini
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot be empty"
        },
        isAlphanumeric: {
          args: true,
          msg: "Username can only contain letters and numbers"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserPostQuestions',
  });
  return UserPostQuestions;
};