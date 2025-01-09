"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId" }); //ini belongsto user
      Post.belongsTo(models.Tag, { foreignKey: "tagId", as: "Tag" }); //ini belongs to tags
    }
  }
  Post.init(
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
        references: {
          model: "Tags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  // console.log("Request Body:", req.body);

  return Post;
};
