/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

/* Cria o servidor WEB */
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

/* Cria conexão com banco de dados */
const con = mysql.createConnection({
    host: 'localhost',      // O host do banco. Ex: localhost
    user: 'root',           // Um usuário do banco. Ex: user 
    password: 'root',       // A senha do usuário. Ex: user123
    database: 'api_database', // Nome do banco de dados
    port: 3306
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

/** Cria uma função do tipo POST para a rota '/api/login' */
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    console.log('Requisição de login recebida:', email, senha); // Log para verificar o email e a senha recebidos

    // Corrigido o nome da tabela para 'usuarios' e a condição `rows.length`
    con.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, rows) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).send('Erro ao consultar o banco de dados');
            return;
        }

        console.log('Resultado da consulta ao banco de dados:', rows);


        if (rows.length > 0 && senha === rows[0].senha) {
            console.log('Usuário autenticado com sucesso');
            res.status(200).send('Autenticado');
            return;
        }

        console.log('Falha na autenticação');
        res.status(401).send('Usuário ou senha inválido');
    });
});

app.listen(5000, () => {
    console.log('Servidor em execução na porta 5000!');
});
