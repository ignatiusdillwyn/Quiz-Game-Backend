'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserParticipants', {
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
      score: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
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
    
    // Tambahkan unique constraint untuk email
    await queryInterface.addConstraint('UserParticipants', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint_2'
    });
    
    // Tambahkan unique constraint untuk username
    await queryInterface.addConstraint('UserParticipants', {
      fields: ['username'],
      type: 'unique',
      name: 'unique_username_constraint_2'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserParticipants');
  }
};