"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        title: "The Future of Technology",
        content: "Technology is evolving rapidly...",
        imgUrl: "https://placecats.com/bella/300/200",
        tagId: 1, // Technology' tag
        userId: 1, // 'johndoe'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Healthy Living Tips",
        content: "A healthy lifestyle begins with a balanced diet...",
        imgUrl: "https://placecats.com/millie/300/150",
        tagId: 2, // health-tag
        userId: 2, // janedoe
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Work-Life Balance",
        content: "Achieving work-life balance is essential...",
        imgUrl: "https://placecats.com/300/200",
        tagId: 3, // 'Lifestyle' tag
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
