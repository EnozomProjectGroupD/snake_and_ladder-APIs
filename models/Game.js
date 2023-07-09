import { DataTypes } from "sequelize";
import sequelize from "../database/connection";

const Game = sequelize.define(
  "Game",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      toBe: ["waiting", "playing", "finished"],
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    players_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Game;
