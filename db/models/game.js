import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";



export const gameModel= sequelizeInstance.define('game',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    creator_id:{
        type:DataTypes.STRING(55),
        references: {
            model: User,
            key: 'id',
          },
    },
    status:{ 
        type:DataTypes.STRING(55),
    },
   
    board_id:{//forign key 
        type:DataTypes.STRING(55),
        allowNull:false,
        
    },
    
        },{timestamps:true}
)


console.log(gameModel == sequelizeInstance.models.user)