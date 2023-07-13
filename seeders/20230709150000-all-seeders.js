"use strict";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import Board from "../models/Board.js";
import SnakeLadder from "../models/Snake_Ladder.js";
import Player from "../models/Player.js";
import Game from "../models/Game.js";

const __dirname = path.resolve();

export default {
  up: async (queryInterface, Sequelize) => {
    // Create automatic seeders for each model
    // User Seeder
    const usersData = [];
    // User Seeder
    for (let i = 0; i < 10; i++) {
      const userData = {
        name: faker.person.fullName(),
        username: `user${i + 1}`,
        password: "$2b$10$hR2m4u/ELOTdivIEkvVNEedXEnPIT57sF6RloZpgzWEY.ffic1N/O", // 1@Aaaaaa
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      usersData.push(userData);
    }
    await queryInterface.bulkInsert("Users", usersData, {});
    // Board Seeder
    for (let i = 0; i < 5; i++) {
      const imageFile = fs.readFileSync(
        path.join(__dirname, `./assets/images/board${i + 1}.jpg`)
      );
      const buffer = Buffer.from(imageFile);
      const boardData = {
        Buffer: buffer,
        fileExtension: "jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Board.create(boardData);
    }
    // Game Seeder
    for (let i = 0; i < 5; i++) {
      const gameData = {
        creator_id: i + 1,
        status: "waiting", // "waiting", "playing", "finished
        board_id: faker.datatype.number({ min: 1, max: 5 }),
        players_number: faker.datatype.number({ min: 2, max: 10 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const playerData = {
        user_id: i + 1,
        game_id: i + 1,
        player_order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Game.create(gameData);
      await Player.create(playerData);
    }

    // SnakeLadder Seeder
    for (let i = 0; i < 5; i++) {
      const board_id = i + 1;
      const num = Math.floor(Math.random() * 10) + 1;
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
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all the data seeded by the up function for each model
    await queryInterface.bulkDelete("Boards", null, {});
    await queryInterface.bulkDelete("Games", null, {});
    await queryInterface.bulkDelete("Players", null, {});
    await queryInterface.bulkDelete("SnakeLadders", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
