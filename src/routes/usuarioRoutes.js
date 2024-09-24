const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para criar um novo usuário
router.post('/', async (req, res, next) => {
    try {
        await usuarioController.criarUsuario(req, res);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

// Rota para listar todos os usuários
router.get('/', async (req, res, next) => {
    try {
        await usuarioController.buscarUsuarios(req, res);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

// Rota para buscar um usuário por ID
router.get('/:id', async (req, res, next) => {
    try {
        await usuarioController.buscarUsuarioPorId(req, res);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

// Rota para atualizar um usuário
router.put('/:id', async (req, res, next) => {
    try {
        await usuarioController.atualizarUsuario(req, res);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

// Rota para deletar um usuário
router.delete('/:id', async (req, res, next) => {
    try {
        await usuarioController.deletarUsuario(req, res);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

module.exports = router;
