'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static validPassword(password) {
      return bcrypt.compare(password, this.password);
    }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true,
      },
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    role: {
      type: DataTypes.ENUM('buyer', 'seller'), 
      allowNull: false,
  },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10); 
        }
      }
    }
  });

  return User;
};