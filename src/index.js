const express = require('express');
const { createConnection } = require('typeorm');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar o JSON das requisições
app.use(express.json());

// Rota de Health Check
app.get('/cashflow/healthcheck', (req, res) => {
    res.status(200).json({ status: 'Sucesso' });
});

// Rotas para usuários e transacoes
app.use('/cashflow/usuarios', require('./routes/usuarioRoutes'));
app.use('/cashflow/transacoes', require('./routes/transacaoRoutes'));

// Conectar ao banco de dados e iniciar o servidor
createConnection().then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);  // Finaliza o processo em caso de erro de conexão
});
