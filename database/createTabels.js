import sequelize from "./connection.js";
import User from "../models/User.js";
import Game from "../models/Game.js";
import Player from "../models/Player.js";
import Board from "../models/Board.js";
import SnakeLadder from "../models/Snake_Ladder.js";

const createTables = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
};

Game.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
User.hasMany(Game, { foreignKey: "creator_id", as: "games" });

Game.hasMany(Player, { foreignKey: "game_id", as: "players" });
Player.belongsTo(Game, { foreignKey: "game_id", as: "game" });

Player.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Player, { foreignKey: "user_id", as: "players" });

Game.belongsTo(Board, { foreignKey: "board_id", as: "board" });
Board.hasOne(Game, { foreignKey: "board_id", as: "game" });

Board.hasMany(SnakeLadder, { foreignKey: "board_id", as: "snakeLadders" });
SnakeLadder.belongsTo(Board, { foreignKey: "board_id", as: "board" });

export default createTables;
