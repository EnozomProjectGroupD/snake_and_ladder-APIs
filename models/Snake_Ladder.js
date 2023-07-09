import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const SnakeLadder = sequelize.define("SnakeLadder", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  end: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default SnakeLadder;
