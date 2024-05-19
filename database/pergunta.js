//pra definir o modulo primeiro tem que se importar o sequelize e depois a conexão
import { STRING, TEXT } from 'sequelize';
import connection from './database.js';

//model é uma estrutura de dados que representa a tabela
const Pergunta = connection.define('pergunta', {
    titulo: {
        type: STRING,
        allowNull: false
    },
    descricao: {
        type: TEXT,
        allowNull: false
    }

});

Pergunta.sync({ force: false }).then(() => { });

export default Pergunta;