const { getRepository } = require('typeorm');
const Usuario = require('../entities/Usuario');



// Criar um novo usuário
const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const usuarioRepo = getRepository(Usuario);
    const usuario = usuarioRepo.create({ nome, email, senha });
    await usuarioRepo.save(usuario);
    return res.status(201).json(usuario);
};

// Buscar todos os usuários
const buscarUsuarios = async (req, res) => {
    const usuarioRepo = getRepository(Usuario);
    const usuarios = await usuarioRepo.find();
    return res.json(usuarios);
};

// Buscar um usuário por ID
const buscarUsuarioPorId = async (req, res) => {
    const usuarioRepo = getRepository(Usuario);
    const usuario = await usuarioRepo.findOne(req.params.id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.json(usuario);
};

// Atualizar um usuário
const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const usuarioRepo = getRepository(Usuario);
    let usuario = await usuarioRepo.findOne(req.params.id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    await usuarioRepo.save(usuario);
    return res.json(usuario);
};

// Deletar um usuário
const deletarUsuario = async (req, res) => {
    const usuarioRepo = getRepository(Usuario);
    let usuario = await usuarioRepo.findOne(req.params.id);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await usuarioRepo.remove(usuario);
    return res.json({ message: 'Usuário deletado com sucesso' });
};

module.exports = {
    criarUsuario,
    buscarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
};
