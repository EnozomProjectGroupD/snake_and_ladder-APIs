import Game from "./../models/Game.js";
import Board from "./../models/Board.js";
import User from "./../models/User.js";
import SnakeLadder from "./../models/Snake_Ladder.js";
import Player from "../models/Player.js";

const createGame = async (req, res) => {
  const { players_number, board_id } = req.body;
  const creator_id = req.userId;

  const ifPlayerExist = await Player.findOne({
    where: { user_id: creator_id, status: "inGame" },
  });

  if (ifPlayerExist) {
    return res.status(400).json({
      error: "You are already in a game. You can't create a new game.",
    });
  }

  if (!creator_id || !players_number || !board_id) {
    return res.status(400).json({
      error:
        "Missing required fields. Please provide creator_id, players_number, and board_id.",
    });
  }

  const creator = await User.findByPk(creator_id);
  if (!creator) {
    return res.status(400).json({
      error: "Invalid creator_id. Please provide a valid creator_id.",
    });
  }

  const board = await Board.findByPk(board_id);
  if (!board) {
    return res.status(400).json({
      error: "Invalid board_id. Please provide a valid board_id.",
    });
  }

  if (players_number < 2 || players_number > 10) {
    return res.status(400).json({
      error: "players_number should be between 2 and 10",
    });
  }

  try {
    const game = await Game.create({
      creator_id,
      status: "waiting",
      board_id,
      players_number,
    });

    await Player.create({
      game_id: game.id,
      user_id: creator_id,
      status: "inGame",
      player_order: 1,
    });

    return res.status(201).json({
      message: "Game created successfully",
      game,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getGame = async (req, res) => {
  const { id } = req.params;

  if (Game.findByPk(id) === null)
    return res.status(404).json({
      error: "Game not found",
    });

  try {
    const game = await Game.findByPk(id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name"],
        },
        {
          model: Board,
          as: "board",
          attributes: ["id", "buffer"],
          include: [
            {
              model: SnakeLadder,
              as: "snakeLadders",
              attributes: ["id", "type", "start", "end"],
            },
          ],
        },
        {
          model: Player,
          as: "players",
          attributes: ["id", "position", "player_order", "status"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      game,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getGames = async (req, res) => {
  const { status } = req.query;

  try {
    const games = await Game.findAll({
      where: status ? { status } : {},
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name"],
        },
        {
          model: Player,
          as: "players",
          attributes: ["id", "position", "player_order"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      games,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const startGame = async (req, res) => {
  const { id } = req.params;
  const creator_id = req.userId;

  try {
    const game = await Game.findByPk(id);

    const playersNumber = await Player.count({
      where: { game_id: id, status: "inGame" },
    });

    if (!game)
      return res.status(404).json({
        error: "Game not found",
      });

    if (game.creator_id !== creator_id)
      return res.status(403).json({
        error: "You can only start the game if you are the creator",
      });

    if (game.status !== "waiting")
      return res.status(400).json({
        error: "You can only start the game if the game is waiting",
      });

    if (playersNumber < 2)
      return res.status(400).json({
        error: "You can only start the game if there are at least 2 players",
      });

    await game.update({
      status: "playing",
    });

    return res.status(200).json({
      message: "Game started successfully",
      game,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const { status, players_number } = req.body;

  try {
    const game = await Game.findByPk(id);

    if (!game)
      return res.status(404).json({
        error: "Game not found",
      });

    if (players_number && players_number < 2 && players_number > 10)
      return res.status(400).json({
        error: "players_number should be between 2 and 10",
      });

    if (players_number && game.status !== "waiting")
      return res.status(400).json({
        error: "You can only change players_number if the game is waiting",
      });

    if (
      (status === "playing" && game.status !== "waiting") ||
      game.players.length < 2
    )
      return res.status(400).json({
        error:
          "You can only change status to playing if the game is waiting and there are at least 2 players",
      });

    await game.update({
      players_number,
      status,
    });

    return res.status(200).json({
      message: "Game updated successfully",
      game,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default {
  createGame,
  getGame,
  getGames,
  updateGame,
  startGame,
};
