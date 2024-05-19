//pra definir o modulo primeiro tem que se importar o sequelizer e depois a conexao
const Sequelize = require('sequelize');
const conection=  require('./database');

//model  é uma estrutura de dados que representa a tabela
const Pergunta = conection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Pergunta.sync({force:false}).then(() => {});

module.exports = Pergunta;