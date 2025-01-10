"use strict";
const fs = require("fs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync("./data/tags.json", "utf-8"));
        const users = data.map((el) => {
          delete el.id;
          return {
              ...el,
              createdAt: new Date(),
              updatedAt: new Date(),
          };
      });
    return queryInterface.bulkInsert("Tags", users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};