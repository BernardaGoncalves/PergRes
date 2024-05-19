const Sequelize = require('sequelize');
const conection=  require('./database');
const Pergunta = require('./pergunta');

const Resposta= conection.define( "resposta",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports= Resposta;