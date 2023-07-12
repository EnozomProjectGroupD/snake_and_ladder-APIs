import sequelize from "./connection.js";
import User from "../models/User.js";
import Game from "../models/Game.js";
import Player from "../models/Player.js";
import Board from "../models/Board.js";
import SnakeLadder from "../models/Snake_Ladder.js";
import seed from "../seeders/20230709150000-all-seeders.js";
import { Sequelize } from "sequelize";

const createTables = () => {
  // sequelize
  //   .sync({ force: true })
  //   .then(() => {
  //     console.log("Tables have been created");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

// const queryInterface = sequelize.getQueryInterface();
// seed.up(queryInterface, Sequelize);

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
