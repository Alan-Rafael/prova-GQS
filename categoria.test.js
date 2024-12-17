const request = require("supertest");
const app = require("../app"); // Supondo que o arquivo principal do app seja app.js
const { Categoria } = require('../models/categoria');

describe("Testes de integração para Categoria", () => {
    let categoriaId;
    beforeAll(async () => {
        const categoria = await Categoria.create({
            nome: 'Eletrônicos' 
        });
        const response = await request(app)
        .post("/api/categoria")
        .send(categoriaData);
        categoriaId = response.body.id;
    });
it("Deve retornar uma lista de categorias", async () => {
    const response = await request(app).get("/api/categoria");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
            nome: "Eletrônicos",
            }),
        ])
    );
});

it("Deve criar uma nova categoria", async () => {
    const categoriaData = { nome: "Móveis" };
    const response = await request(app).post("/api/categoria").send(categoriaData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(categoriaData);
});

it("Deve atualizar uma categoria existente", async () => {
    const updatedData = { nome: "Eletrônicos Atualizados" };
    const response = await request(app)
    .put(`/api/categoria/${categoriaId}`)
    .send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedData);
});

it("Deve remover uma categoria existente", async () => {
    const response = await request(app).delete(`/api/categoria/${categoriaId}`);
    expect(response.status).toBe(204);
    const checkResponse = await request(app).get(
    `/api/categoria/${categoriaId}`
    );
    expect(checkResponse.status).toBe(404);
});
});
