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
      Posts.belongsTo(models.Users, { foreignKey: "UserId" }); //ini belongsto user
      Posts.belongsTo(models.Tags, { foreignKey: "TagId"}); //ini belongs to tags
    }
    // static async getPostsByTag(tagValue) {
    //   const condition = tagValue ? { name: tagValue } : {};
    //   return await this.findAll({
    //     include: [
    //       {
    //         model: sequelize.models.Tags,
    //         where: condition, 
    //         required: !!tagValue, 
    //       },
    //       {
    //         model: sequelize.models.Users, 
    //       },
    //     ],
    //   });
    // }
    
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
      imgURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        }
      },
      TagId: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
        field: "TagId",
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );

  return Posts;
};
