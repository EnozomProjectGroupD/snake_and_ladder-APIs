<<<<<<< HEAD:db/models/game.model.js
// import { DataTypes } from "sequelize";
// import { sequelizeInstance } from "../db.connection";
// import { userModel } from './user.model';
=======
import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../database/db.connection";
import { userModel } from './user.model';
>>>>>>> 4799cf2094e79fd07c9df5296de6815032d0d554:models/game.model.js


// export const gameModel= sequelizeInstance.define('game',{
//     id:{
//         type:DataTypes.INTEGER(11),
//         primaryKey:true,
//         autoIncrement:true
//     },
//     creator_id:{
//         type:DataTypes.STRING(55),
//         references: {
//             model: userModel,
//             key: 'id',
//           },
//     },
//     status:{ 
//         type:DataTypes.STRING(55),
//     },
    
//     board_id:{
//         type:DataTypes.STRING(55),
//         allowNull:false,
//          references: {
//             model: boardModel,
//             key: 'id',
//           },
//     },
//     current_player:{ 
//         type:DataTypes.STRING(55),
//         references: {
//             model: userModel,
//             key: 'id',
//           },
//     },
//     player_numbers:{ 
//         type:DataTypes.INTEGER(55),
//     },
//         },{timestamps:true}
// )


// console.log(gameModel == sequelizeInstance.models.game)