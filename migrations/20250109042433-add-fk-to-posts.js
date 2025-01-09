"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Posts", "tagId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Tags", //tabel direferensi
        key: "id", //  kunci di table reference
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("Posts", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // nama table direferensi
        key: "id", // kunci di table reference
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Posts", "tagId");
    await queryInterface.removeColumn("Posts", "userId");
  },
};
