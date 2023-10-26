"use strict";
const bcryptjs = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.History);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user) {
          const salt = bcryptjs.genSaltSync(8);
          const hash = bcryptjs.hashSync(user.password, salt);
          user.password = hash;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
