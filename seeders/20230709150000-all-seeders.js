'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create automatic seeders for each model

    // Board Seeder
    const boardsData = [];
    for (let i = 0; i < 5; i++) {
      const boardData = {
        Buffer: faker.lorem.words(3),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      boardsData.push(boardData);
    }
    await queryInterface.bulkInsert('Boards', boardsData, {});

    // Game Seeder
    const gamesData = [];
    for (let i = 0; i < 5; i++) {
      const gameData = {
        creator_id: faker.random.number({ min: 1, max: 10 }),
        status: faker.random.arrayElement(['waiting', 'playing', 'finished']),
        board_id: faker.random.number({ min: 1, max: 5 }),
        current_player: faker.random.number({ min: 1, max: 5 }),
        players_number: faker.random.number({ min: 2, max: 4 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      gamesData.push(gameData);
    }
    await queryInterface.bulkInsert('Games', gamesData, {});

    // Player Seeder
    const playersData = [];
    for (let i = 0; i < 10; i++) {
      const playerData = {
        game_id: faker.random.number({ min: 1, max: 5 }),
        user_id: faker.random.number({ min: 1, max: 10 }),
        position: faker.lorem.words(2),
        player_order: faker.random.number({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      playersData.push(playerData);
    }
    await queryInterface.bulkInsert('Players', playersData, {});

    // SnakeLadder Seeder
    const snakeLaddersData = [];
    for (let i = 0; i < 5; i++) {
      const snakeLadderData = {
        board_id: faker.random.number({ min: 1, max: 5 }),
        type: faker.lorem.words(1),
        start: faker.random.number({ min: 1, max: 50 }),
        end: faker.random.number({ min: 1, max: 50 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      snakeLaddersData.push(snakeLadderData);
    }
    await queryInterface.bulkInsert('SnakeLadders', snakeLaddersData, {});

    // User Seeder
    const usersData = [];
    for (let i = 0; i < 10; i++) {
      const userData = {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      usersData.push(userData);
    }
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all the data seeded by the up function for each model

    await queryInterface.bulkDelete('Boards', null, {});
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Players', null, {});
    await queryInterface.bulkDelete('SnakeLadders', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
