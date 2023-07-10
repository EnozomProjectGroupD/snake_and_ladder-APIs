import Game from "./../models/Game.js";
import Board from "./../models/Board.js";
import User from "./../models/User.js";
import SnakeLadder from "./../models/Snake_Ladder.js";
import Player from "../models/Player.js";

const createGame = async (req, res) => {
  const { players_number, board_id } = req.body;
  const creator_id = req.user.id;
  if (!creator_id || !players_number  || !board_id)
    return res.status(400).json({
      error:
        "Missing required fields you should send creator_id, players_number, board_id",
    });

  if (!(await User.findByPk(creator_id)))
    return res.status(400).json({
      error: "creator_id is not valid",
    });

  if (!(await Board.findByPk(board_id)))
    return res.status(400).json({
      error: "board_id is not valid",
    });

  if (players_number < 2 || players_number > 10)
    return res.status(400).json({
      error: "players_number should be between 2 and 10",
    });

  try {
    const game = await Game.create({
      creator_id,
      status: "waiting",
      board_id,
      players_number,
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
              as: "snakes_ladders",
              attributes: ["id", "type", "start", "end"],
            },
          ],
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
};
