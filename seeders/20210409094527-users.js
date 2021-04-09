'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const users = require('./Users.json')
     await queryInterface.bulkInsert(
      "User",
      users,
      {
        logging: console.log,
        timestamp: false,
      },
      {
        id: {
          autoIncrement: true,
        },
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('User', null, {})
  }
};
