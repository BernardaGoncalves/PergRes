import express from "express";

//importacao da conexao
import connection from './database/database.js';
import Pergunta from "./database/pergunta.js";
import Resposta from './database/resposta.js';

//Responsável por traduzir os dados enviados no formulario em uma estrutura js que podemos utilizar no back-end
import bodyParser from 'body-parser';
import { where } from "sequelize";

const app = express();

connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com sucesso")
    })
    .catch(() => {
        console.log(msgErro);
    })


//dizer ao express para usar o EJS como view engine
app.set('view engine', 'ejs');

//Codigo para aceitar Estilos estaticos no express
app.use(express.static('public'));

//Configuração do bodyParser que Permite que a pessoa envie os dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {

    //O codigo abaixo equivale ao SELECT *FROM ou todos do banco de dados
    Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(pergunta => {
        //o render ou redirecionar desenha alguma coisa na tela quando o usuario acessa a pagina 
        // o render também vai direto na pasta view, não precisa especificar o caminho view
        res.render("index", {
            pergunta: pergunta
        });
    })

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/receberPergunta", (req, res) => {
    //Pegar o nome ou informacoes dos formulario do html
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //O codigo abaixo equivale ao INSERT INTO *** do banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })

});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(resposta => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    resposta: resposta
                });
            });
        } else {
            //pergunta nao encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    }
    );
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
}, () => {
    console.log("Server running");
})