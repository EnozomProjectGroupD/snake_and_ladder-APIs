import Player from "../models/Player.js";
import LadderSnake from "../models/Snake_Ladder.js";
// function to move player
const movePLayer = async (req, res) => {
  try {
    const rollValue = Math.floor(Math.random() * 6) + 1;
    const playerId = req.body.id;
    const player = Player.findByPk(playerId);
    const newPostion = player.position + rollValue;
    if (newPostion <= 100) {
      player.position = newPostion;
    }
    // check if the new position is a ladder or snake
    const ladderSnakeObj = checkLadderSnake(player.position);
    //if it is a ladder or snake, move the player to the end of the ladder or snake
    if (ladderSnakeObj) {
      player.position = ladderSnakeObj.end;
    }
    player.updatedAt = new Date();
    Player.update(player, { where: { id: playerId } });
    res.status(200).json({ rollValue: rollValue, position: player.position });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// function to return player position
const getPosition = async (req, res) => {
  try {
    const playerId = req.body.id;
    const player = playerModel.findByPk(playerId);
    res.status(200).json({ position: player.position });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// function to check if the new position is a ladder or snake
const checkLadderSnake = async (position) =>
  LadderSnake.findOne({ where: { start: position } });

export default {
  movePLayer,
  getPosition,
};
