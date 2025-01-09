"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        username: "johndoe",
        email: "johndoe@example.com",
        password: "hashedpassword123", // Replace with hashed password
        role: "buyer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "janedoe",
        email: "janedoe@example.com",
        password: "hashedpassword456", // Replace with hashed password
        role: "seller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
