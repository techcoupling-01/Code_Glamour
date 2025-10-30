'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Vansh Jain',
        mobile: '8602155444',
        password: 'Asd7788#',
        role: 'admin',
        branch: null,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
