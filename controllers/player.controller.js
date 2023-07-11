import { where } from "sequelize";
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
    const joinedPlayer = await Player.findOne({
      where: { user_id, game_id, status: "outGame" },
    });
    if (joinedPlayer) {
      await joinedPlayer.update(
        {
          status: "inGame",
        },
        { where: { id: joinedPlayer.id } }
      );
      return res.status(200).json({ message: "success", player: joinedPlayer });
    }
    if (game.status !== "waiting") {
      return res.status(400).json({ message: "Game is not waiting" });
    }

    const player = await Player.findOne({
      where: { user_id, game_id, status: "inGame" },
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
      status: "inGame",
      game_id,
      user_id,
      player_order,
    });

    if (newPlayer.player_order === game.players_number) {
      await Game.update({ status: "playing" }, { where: { id: game_id } });
    }

    res.status(200).json({ message: "success added", player: newPlayer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const leavePlayer = async (req, res) => {
  try {
    const user_id = req.userId;
    const player = await Player.findOne({
      where: { user_id, status: "inGame" },
    });
    const game = await Game.findOne({ where: { id: player.game_id } });
    console.log(player);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    await player.update(
      {
        status: "outGame",
      },
      { where: { id: player.id } }
    );
    if (
      (await Player.count({
        where: { game_id: player.game_id, status: "inGame" },
      })) < 2
    ) {
      await game.update({ status: "finished" });
      const winner = await Player.findOne({
        where: { game_id: player.game_id, status: "inGame" },
      });
      return res.status(200).json({
        message: "success",
        player: winner,
        game: game,
      });
    }
    res.status(200).json({ message: "success", player: player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to move player
const movePLayer = async (req, res) => {
  try {
    const rollValue = Math.floor(Math.random() * 6) + 1;
    const userId = req.userId;
    const gameId = req.body.gameId;
    const game = await Game.findOne({ where: { id: gameId } });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (game.status !== "playing") {
      return res.status(400).json({ message: "Game is not playing" });
    }

    const currentPlayer = game.current_player;

    const player = await Player.findOne({
      where: { user_id: userId, game_id: gameId, status: "inGame" },
    });
    const numberOfPlayers = await Player.count({ where: { game_id: gameId } });
    if (player.player_order !== currentPlayer) {
      return res.status(400).json({ message: "Not your turn" });
    }

    const newPostion = player.position + rollValue;

    if (newPostion <= 100) {
      player.position = newPostion;
    }
    // check if the new position is a ladder or snake
    //if it is a ladder or snake, move the player to the end of the ladder or snake
    const ladderSnakeObj = await checkLadderSnake(player.position);
    if (ladderSnakeObj) {
      player.position = ladderSnakeObj.end;
    }

    await player.update({ position: player.position });

    if (player.position === 100) {
      game.status = "finished";
      await game.update(game, { where: { id: game.id } });
      return res.status(200).json({
        message: "success",
        rollValue: rollValue,
        player: player,
        game: game,
      });
    }

    const newPayer = (currentPlayer % numberOfPlayers) + 1;

    await game.update({ current_player: newPayer });

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
  leavePlayer,
};
