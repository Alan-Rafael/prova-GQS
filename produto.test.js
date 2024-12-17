// test/produto.test.js
const request = require('supertest');
const { app } = require('../app');
const { Categoria } = require('../models/categoria');
const { Produto } = require('../models/produto');

describe('Testes de integração para Produto', () => {
    let categoriaId;
    let produtoId;
    beforeAll(async () => {
        await Produto.destroy({ where: {} }); 
        await Categoria.destroy({ where: {} }); 

        const categoria = await Categoria.create({
            nome: 'Eletrônicos' 
        });

        const produtoData = { 
            nome: 'Smartphone',
            preco: 799.99, 
            quantidade: 10, 
            categoriaId: 15 
        };
        
        const response = await request(app).post('/api/produto').send(produtoData);
        categoriaId = categoria.id;
        produtoId = response.body.id;
        console.log(produtoId);
    });

    afterAll(async () => {
        await Produto.destroy({ where: {} });
        await Categoria.destroy({ where: {} });
    });

    it('Deve criar um novo produto', async () => {
        const produtoData = 
        { nome: 'Smartphone', preco: 799.99, quantidade: 10, categoriaId};
        const response = await request(app).post('/api/produto').send(produtoData);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(produtoData);
    });

    it('Deve atualizar um produto existente', async () => {
        const produtoData = { 
            nome: 'Smartphone',
            preco: 799.99, 
            quantidade: 10,
            categoriaId};

        const pd = await request(app).post('/api/produto').send(produtoData);
        const produtoId = pd.body.id;

        const updatedData = { nome: 'Tablet Pro', preco: 399.99, quantidade: 5 };
        
        const response = await request(app).put(`/api/produto/${produtoId}`).send(updatedData);
    
        // expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(updatedData));
    });

    it('Deve retornar uma lista de produtos', async () => {
        const response = await request(app).get('/api/produto');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve remover um produto existente', async () => {
        const response = await request(app).delete(`/api/produto/${produtoId}`);
        expect(response.status).toBe(204);
        const checkResponse = await request(app).get(`/api/produto/${produtoId}`);
        expect(checkResponse.status).toBe(404);
    });
    
});
