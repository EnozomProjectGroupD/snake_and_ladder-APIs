// * db connection
import { Sequelize } from "sequelize";

export const sequelizeInstance =new Sequelize('sqlize','root','',{
    host:'localhost',
    dialect:'mysql'
})

export const dbConnection = async ()=>{
    return await sequelizeInstance.sync({alter:true})
    .then((res) => console.log('connection had been established successfully'))
    .catch((err) => console.log('connection failed ', err));
}   