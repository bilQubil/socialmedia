"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Users, { foreignKey: "userId" }); //ini belongsto user
      Posts.belongsTo(models.Tags, { foreignKey: "tagId", as: "Tag" }); //ini belongs to tags
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true },
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: { isUrl: true },
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "tagId",
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );

  return Posts;
};
