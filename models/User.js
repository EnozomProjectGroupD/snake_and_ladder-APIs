import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import bcrypt from "bcrypt";



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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Hash the password using bcrypt before saving
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue("password", hashedPassword);
    },
  },
});

export default User;
