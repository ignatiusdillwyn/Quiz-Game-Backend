'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPostQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    // Tambahkan unique constraint dengan nama custom
    await queryInterface.addConstraint('UserPostQuestions', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
    });
    
    await queryInterface.addConstraint('UserPostQuestions', {
      fields: ['username'],
      type: 'unique',
      name: 'unique_username_constraint'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserPostQuestions');
  }
};