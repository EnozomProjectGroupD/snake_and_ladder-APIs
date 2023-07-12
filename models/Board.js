import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Board = sequelize.define("Board", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Buffer: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
  fileExtension: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Board;
