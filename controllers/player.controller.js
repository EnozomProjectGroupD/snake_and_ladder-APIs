import Player from "../models/Player.js";
import LadderSnake from "../models/Snake_Ladder.js";

const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(200).json({ message: "success", player: player });
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
    console.log(player);
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
    const playerId = req.body.id;
    const player = await Player.findByPk(playerId);
    console.log(player);
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
  createPlayer,
  movePLayer,
  getPosition,
};
