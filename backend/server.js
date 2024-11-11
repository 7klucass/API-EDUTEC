/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const port = 5000;

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
    port: 3306,
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

/* Endpoint de registro */
app.post('/api/register', (req, res) => {
    const { nome, email, senha, senhaConfirm } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha || !senhaConfirm) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    // Verifica se as senhas coincidem
    if (senha !== senhaConfirm) {
        return res.status(400).json({ message: 'As senhas não coincidem!' });
    }

    con.query('SELECT * FROM register WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Email já registrado!' });
        }
        con.query('INSERT INTO register (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao registrar usuário' });
            }

            return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
