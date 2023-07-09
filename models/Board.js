import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const Board = sequelize.define("Board", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Buffer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Board;
