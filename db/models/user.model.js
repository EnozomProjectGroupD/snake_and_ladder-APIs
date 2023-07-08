import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../db.connection";



export const userModel= sequelizeInstance.define('user',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(55),
        allowNull:false
    },
    userName:{ 
        type:DataTypes.STRING(55),
        allowNull:false,
        unique:true
    },
   
    password:{
        type:DataTypes.STRING(55),
        allowNull:false,
        
    },
   
        },{timestamps:true}
)


console.log(userModel == sequelizeInstance.models.user)