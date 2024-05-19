//criar a conexao com o bd usado sequelize
import Sequelize from "sequelize";
import 'dotenv/config'

let { HOST, USER, PASSWORD, DATABASE, DBPORT } = process.env

const connection = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});

//exportando a conexao criada acima 
export default connection;
