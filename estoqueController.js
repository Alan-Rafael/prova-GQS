// controllers/estoque.controller.js
const { Produto } = require('../models/produto');
const { Estoque } = require('../models/estoque');

const criarEstoque = async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;
        const estoque = await Estoque.create({ produtoId, quantidade });
        res.status(201).json(estoque);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listarEstoque = async (req, res) => {
    try {
        const estoque = await Estoque.findAll({ include: Produto });
        res.status(200).json(estoque);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const atualizarEstoque = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;
        const estoque = await Estoque.findByPk(id);

        if (!estoque) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado' });
        }

        estoque.quantidade = quantidade;
        await estoque.save();
        res.status(200).json(estoque);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removerEstoque = async (req, res) => {
    try {
        const { id } = req.params;
        const estoque = await Estoque.findByPk(id);

        if (!estoque) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado' });
        }

        await estoque.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    criarEstoque,
    listarEstoque,
    atualizarEstoque,
    removerEstoque
};
