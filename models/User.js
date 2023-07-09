import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    afterUpdate: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
  },
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.generateToken = function(){
  const payload = {
    id: this.id,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token
}

// const token = user.generateToken();
// console.log(token);

export default User;
