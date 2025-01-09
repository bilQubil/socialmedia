"use strict";
const { Model } = require("sequelize");
const { post } = require("../routes");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.User, { foreignKey: "userId" }); //ini belongsto user
      Posts.belongsTo(model.Tag, { foreignKey: "tagId" }); //ini belongs to tags
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, //biar title gak empty
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true, //content gak empty
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true, // imgUrl juga ga boleh empty
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // postnya harus belongs to user
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Posts harus belongs to tag
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );

  return Posts;
};
