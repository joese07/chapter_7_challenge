"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const { password } = require("pg/lib/defaults");
module.exports = (sequelize, DataTypes) => {
  class Adminuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async register({ name, email, password }) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      return this.create({ name, email, password: encryptedPassword });
    }

    static async authenticate({ name, email, password }) {
      try {
        const Adminuser = await this.findOne({ where: { name } });
        if (!Adminuser) return Promise.reject(" User Not found");

        const isPasswordValid = await bcrypt.compare(
          password,
          Adminuser.password
        );
        if (!isPasswordValid) return Promise.reject(" Wrong Password");

        return Promise.resolve(Adminuser);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
  Adminuser.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Adminuser",
    }
  );
  return Adminuser;
};
