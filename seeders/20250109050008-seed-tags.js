"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tags", [
      {
        id: 1,
        name: "Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 2, name: "Health", createdAt: new Date(), updatedAt: new Date() },
      {
        id: 3,
        name: "Lifestyle",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};
