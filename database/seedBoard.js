import Board from "../models/Board.js";
import SnakeLadder from "../models/Snake_Ladder.js";

export const seedBoard = async (num) => {
  for (let i = 0; i < num; i++) {
    const board = await Board.create({
      name: `Board ${i}`,
      Buffer: `This is board ${i}`,
    });

    console.log(board.id + " created");
  }

  console.log("Boards created successfully");
};

export const seedSnakeLadder = async (num, board_id) => {
  for (let i = 0; i < num; i++) {
    const type = Math.random() < 0.5 ? "snake" : "ladder";
    // if type == ladder, start < end
    if (type === "ladder") {
      const start = Math.floor(Math.random() * 98) + 1;
      const end = Math.floor(Math.random() * (99 - start)) + start + 1;
      const ladder = await SnakeLadder.create({
        board_id: board_id,
        type: type,
        start: start,
        end: end,
      });

      console.log("ladder " + ladder.id + " created");
    }
    // if type == snake, start > end
    else {
      const start = Math.floor(Math.random() * 99) + 2;
      const end = Math.floor(Math.random() * (start - 1)) + 1;
      const snake = await SnakeLadder.create({
        board_id: board_id,
        type: type,
        start: start,
        end: end,
      });

      console.log("snake " + snake.id + " created");
    }
  }
};
