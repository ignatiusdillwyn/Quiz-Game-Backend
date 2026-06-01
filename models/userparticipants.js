'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserParticipants extends Model {
    static associate(models) {
      // define association here
      UserParticipants.hasOne(models.Leaderbord, { foreignKey: "userParticipant_id" });
    }
  }
  UserParticipants.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_email_constraint_2',
        msg: 'Email is already registered'  // ← pindahkan pesan error ke sini
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "Email format is invalid"
        },
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
        name: 'unique_username_constraint_2',
        msg: 'Username is already used'  // ← perbaiki nama constraint dan pesan
      },
      validate: {
        len: {
          args: [3, 50],
          msg: "Username must be between 3 and 50 characters"
        },
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
    modelName: 'UserParticipants',
  });
  return UserParticipants;
};