const { Categoria } = require('../models/categoria');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar categorias', details: error.message });
    }
};

const adicionarCategoria = async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }
        const novaCategoria = await Categoria.create({ nome });
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar categoria', details: error.message });
    }
};

const atualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        categoria.nome = nome;
        await categoria.save();

        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar categoria', details: error.message });
    }
};

const removerCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        await categoria.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover categoria', details: error.message });
    }
};

module.exports = {
    listarCategorias,
    adicionarCategoria,
    atualizarCategoria,
    removerCategoria,
};
