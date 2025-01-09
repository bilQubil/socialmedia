"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // harus email yang unik
        validate: {
          isEmail: true, // ada email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8], // ada minimum lengthnya
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["buyer", "seller"]],
        },
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.username || "Anonymous User";
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return User;
};
