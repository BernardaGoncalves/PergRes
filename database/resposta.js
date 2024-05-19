import { TEXT, INTEGER } from 'sequelize';
import connection from './database.js';

const Resposta = connection.define("resposta", {
    corpo: {
        type: TEXT,
        allowNull: false
    },
    perguntaId: {
        type: INTEGER,
        allowNull: false
    }
});

Resposta.sync({ force: false }).then(() => { 
    console.log('\nTabela \'resposta\' sincronizada.\n');
});


export default Resposta;