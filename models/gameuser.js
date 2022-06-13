"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class Gameuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gameuser.hasMany(models.Historiesuser, {
        foreignKey: "idgameuser",
        as: "historiesusers",
      });
    }

    static async register({
      name,
      username,
      password,
      email,
      phoneNumber,
      placeOfBirth,
      dateOfBirth,
      address,
    }) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      return this.create({
        name,
        username,
        password: encryptedPassword,
        email,
        phoneNumber,
        placeOfBirth,
        dateOfBirth,
        address,
      });
    }

    
    generateToken() {
      const payload = {
        id: this.id,
        username: this.username,
      };
      const rahasia = "ini rahasia ga boleh disebar";

      const token = jwt.sign(payload, rahasia);
      return token;
    }

    static async authenticate({ username, password }) {
      try {
        const Gameuser = await this.findOne({ where: { username } });
        if (!Gameuser) return Promise.reject("  Password / Username Invalid ");

        const isPasswordValid = await bcrypt.compare(
          password,
          Gameuser.password
        );
        if (!isPasswordValid)
          return Promise.reject(" Password / Username Invalid ");

        return Promise.resolve(Gameuser);
      } catch (err) {
        return Promise.reject(err);
      }
    }

  }

  Gameuser.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      placeOfBirth: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Gameuser",
    }
  );
  return Gameuser;
};
