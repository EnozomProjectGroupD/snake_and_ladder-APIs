import SnakeLadder from "../models/Snake_Ladder.js";
import Board from "../models/Board.js";

// const getSnakeLadder = async (req, res) => {
//   const position = req.body.position;
//   try {
//     const snakeLadder = await SnakeLadder.findOne({
//       where: { start: position },
//     });
//     res.status(200).json({ tile: snakeLadder });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// const getAllSnakeLadders = async (req, res) => {
//   try {
//     const snakeLadders = await SnakeLadder.findAll();
//     res.status(200).json({ snakeLadders: snakeLadders });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const addSnakeLadder = async (req, res) => {
  try {
    const { positions, board_id } = req.body;

    if (Board.findOne({ where: { id: board_id } }) === null)
      return res.status(404).json({ message: "Board not found" });

    const snakeLadder = [];
    positions.forEach((element) => {
      if (element.start > element.end) {
        snakeLadder.push({
          board_id: board_id,
          type: "snake",
          start: element.start,
          end: element.end,
        });
      } else {
        snakeLadder.push({
          board_id: board_id,
          type: "ladder",
          start: element.start,
          end: element.end,
        });
      }
    });
    await SnakeLadder.bulkCreate(snakeLadder);
    res.status(200).json({ message: "Snake and Ladder added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default {
  getSnakeLadder,
  getAllSnakeLadders,
  addSnakeLadder,
};
