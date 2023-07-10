import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  player_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Player;
