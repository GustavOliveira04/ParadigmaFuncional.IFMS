//npm install mysql2
const mysql = require('mysql2')
const express = require('express');
const cors = require('cors');

const porta = 3030;
const app = express();

app.use(cors());

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

    try{
        if(!dados.nome || typeof dados.nome !=='string' || dados.nome.trim()==='') {
            throw new Error('Nome inválido. O nome deve ser uma string não vazia.');
        }
        if(!dados.idade || typeof dados.idade !== 'number' || !Number.isInteger(dados.idade) || dados.idade <= 0) {
            throw new Error('Idade inválida. A idade deve ser um número inteiro maior que 0');
        }
        if(!dados.profissao || typeof dados.profissao !== 'string' || dados.profissao.trim()==='') {
            throw new Error('Profissão inválida. A profissão deve ser uma string não vazia');            
        }
        // Inserção no banco de dados

    
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

} catch (error){
    //Retorno em caso de erro na validação
    res.status(400).json({message:error.message});
}

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