const { getRepository } = require('typeorm');
const Transacao = require('../entities/Transacao');

// Criar uma nova transação
const criarTransacao = async (req, res) => {
    const { tipo, valor, data, usuarioId } = req.body;
    try {
        const transacaoRepo = getRepository(Transacao);
        const transacao = transacaoRepo.create({ tipo, valor, data, usuario: { id: usuarioId } });
        await transacaoRepo.save(transacao);
        return res.status(201).json(transacao);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar transação', error: error.message });
    }
};

// Buscar todas as transações
const buscarTransacoes = async (req, res) => {
    try {
        const transacaoRepo = getRepository(Transacao);
        const transacoes = await transacaoRepo.find({ relations: ['usuario'] });
        return res.json(transacoes);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar transações', error: error.message });
    }
};

// Buscar uma transação por ID
const buscarTransacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const transacaoRepo = getRepository(Transacao);
        const transacao = await transacaoRepo.findOne(id, { relations: ['usuario'] });
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }
        return res.json(transacao);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar transação', error: error.message });
    }
};

// Atualizar uma transação
const atualizarTransacao = async (req, res) => {
    const { id } = req.params;
    const { tipo, valor, data, usuarioId } = req.body;
    try {
        const transacaoRepo = getRepository(Transacao);
        let transacao = await transacaoRepo.findOne(id);
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }
        transacao.tipo = tipo;
        transacao.valor = valor;
        transacao.data = data;
        transacao.usuario = { id: usuarioId };  // Atualiza o usuário associado
        await transacaoRepo.save(transacao);
        return res.json(transacao);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar transação', error: error.message });
    }
};

// Deletar uma transação
const deletarTransacao = async (req, res) => {
    const { id } = req.params;
    try {
        const transacaoRepo = getRepository(Transacao);
        let transacao = await transacaoRepo.findOne(id);
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }
        await transacaoRepo.remove(transacao);
        return res.json({ message: 'Transação deletada com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar transação', error: error.message });
    }
};

module.exports = {
    criarTransacao,
    buscarTransacoes,
    buscarTransacaoPorId,
    atualizarTransacao,
    deletarTransacao
};
