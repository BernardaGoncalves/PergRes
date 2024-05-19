//cirar a conexao com o bd usado sequelize
const Sequelize = require("sequelize");

const conection = new Sequelize('pergRES', 'root', 'Doramaslove#098',{
    host: 'localhost',
    dialect: 'mysql'
});

//exportando a conexao criada acima 
module.exports = conection;
