const request = require('supertest');
const app = require('../app');
const { Produto } = require('../models/produto');
const { Estoque } = require('../models/estoque');

describe('Testes de integração para Estoque', () => {
    let produtoId, estoqueId;

    beforeAll(async () => {
        await Estoque.destroy({ where: {} }); 
        await Produto.destroy({ where: {} });

        const produto = await Produto.create({ nome: 'Smartphone', preco: 799.99, quantidade: 10, categoriaId: 15 });
        produtoId = produto.id;

        const estoqueData = { produtoId, quantidade: 20 };
        const response = await request(app).post('/api/estoque').send(estoqueData);
        estoqueId = response.body.id;
    });

    afterAll(async () => {
        await Estoque.destroy({ where: {} });
        await Produto.destroy({ where: {} });
    });

    it('Deve criar um registro de estoque', async () => {
        await Produto.destroy({ where: {} }); 
        const produto = await Produto.create({ nome: 'Smartphone', preco: 799.99, quantidade: 10, categoriaId: 15 });
        const estoqueData = { produtoId: produto.id, quantidade: 20 };
        const response = await request(app).post('/api/estoque').send(estoqueData);
        
        expect(response.status).toBe(201);
        expect(response.body.produtoId).toBe(produto.id);
        expect(response.body.quantidade).toBe(20);
    });
    

    it('Deve listar todos os registros de estoque', async () => {
        const response = await request(app).get('/api/estoque');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve atualizar um registro de estoque', async () => {
        const updatedData = { quantidade: 25 };
        const response = await request(app).put(`/api/estoque/${estoqueId}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedData);
    });

    it('Deve remover um registro de estoque', async () => {
        const response = await request(app).delete(`/api/estoque/${estoqueId}`);
        expect(response.status).toBe(204);

        const checkResponse = await request(app).get(`/api/estoque/${estoqueId}`);
        expect(checkResponse.status).toBe(404);
    });
});
