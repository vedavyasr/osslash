"use strict";
const userRoles = require("./UserRoles.json");
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
    await queryInterface.bulkInsert(
      "UserRole",
      userRoles,
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
    return queryInterface.bulkDelete('UserRole', null, {})
  },
};
