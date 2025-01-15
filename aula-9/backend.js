//npm install mysql2
const mysql = require('mysql2')
const express = require('express');

const app = express();
const porta = 3030;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ifms',
    database: 'tads'
});

app.use(express.json())

//POST SALVAR NO BANCO
app.post('/api/dados', (req, res) => {

    const dados = req.body

    //if
    connection.query(
        'INSERT INTO pessoa (nome, idade, profissao) VALUES (?, ?, ?)',
        [dados.nome, dados.idade, dados.profissao],
        (err, results) =>{
            if (err) {
                console.error('Erro ao inserir no banco de dados: ' + err.stack);
                res.status(500).json({message: 'Erro ao inserir dados no banco de dados.'});
                return;
            }
            res.json({
                message: 'Dados recebidos e inseridos com sucesso!',
                dados: dados,
                resultadoBanco: results
            });
        }
    );
});

//Endpoint para buscar dados do banco de dados
app.get('/api/getdados', (req, res) => {
    //Realiza uma consulta ao banco de dados para buscar dados
    connection.query('SELECT * FROM pessoa', (err, results) => {
        if (err) {
            console.error('Erro ao consultar dados: ' + err.stack);
    res.status(500).json({message: 'Erro ao consultar dados no banco de dados.'});
            return;
        }
        res.json({
            message: 'Dados recuperados com sucesso!',
            dados: results
        });
    });
});
app.listen(porta, () => { console.log(`Servidor em execução:http://localhost:${porta}`);});