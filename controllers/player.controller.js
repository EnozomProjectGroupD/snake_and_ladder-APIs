import Game from "../models/Game.js";
import Player from "../models/Player.js";
import LadderSnake from "../models/Snake_Ladder.js";
import User from "../models/User.js";

const joinPlayer = async (req, res) => {
  try {
    const { game_id } = req.body;
    const user_id = req.userId;
    if (!game_id || !user_id) {
      return res
        .status(400)
        .json({ message: "game_id and user_id are required" });
    }

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const game = await Game.findOne({ where: { id: game_id } });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const player = await Player.findOne({
      where: { user_id, game_id },
    });
    if (player) {
      return res.status(400).json({ message: "Player already joined" });
    }

    const numberOfPlayers = await Player.count({ where: { game_id } });
    if (numberOfPlayers >= game.players_number) {
      return res.status(400).json({ message: "Game is full" });
    }

    const player_order = numberOfPlayers + 1;

    const newPlayer = await Player.create({
      game_id,
      user_id,
      player_order,
    });

    res.status(200).json({ message: "success added", player: newPlayer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to move player
const movePLayer = async (req, res) => {
  try {
    const rollValue = Math.floor(Math.random() * 6) + 1;
    const playerId = req.body.id;
    const player = await Player.findByPk(playerId);
    const newPostion = player.position + rollValue;
    //check if the new position is valid
    if (newPostion <= 100) {
      player.position = newPostion;
    }
    // check if the new position is a ladder or snake
    //if it is a ladder or snake, move the player to the end of the ladder or snake
    const ladderSnakeObj = await checkLadderSnake(player.position);
    if (ladderSnakeObj) {
      player.position = ladderSnakeObj.end;
    }
    player.updatedAt = new Date();
    Player.update(player, { where: { id: playerId } });
    res.status(200).json({
      message: "success",
      rollValue: rollValue,
      position: player.position,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// function to return player position
const getPosition = async (req, res) => {
  try {
    const user = req.user;
    const player = await Player.findOne({ where: { user_id: user.id } });

    res.status(200).json({ position: player.position });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// function to check if the new position is a ladder or snake
const checkLadderSnake = async (position) => {
  if (!position || position > 100) {
    return undefined;
  }
  try {
    return await LadderSnake.findOne({ where: { start: position } });
  } catch (error) {
    return undefined;
  }
};

export default {
  joinPlayer,
  movePLayer,
  getPosition,
};
