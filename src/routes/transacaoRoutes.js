const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');

// Rota para criar uma nova transação
router.post('/', transacaoController.criarTransacao);

// Rota para listar todas as transações
router.get('/', transacaoController.buscarTransacoes);

// Rota para buscar uma transação por ID
router.get('/:id', transacaoController.buscarTransacaoPorId);

// Rota para atualizar uma transação
router.put('/:id', transacaoController.atualizarTransacao);

// Rota para deletar uma transação
router.delete('/:id', transacaoController.deletarTransacao);

module.exports = router;
