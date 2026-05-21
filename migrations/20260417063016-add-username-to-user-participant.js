'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserParticipants', 'username', {
      type: Sequelize.STRING,
      allowNull: true, // bisa diubah ke false kalau wajib
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserParticipants', 'username');
  }
};