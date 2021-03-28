const request = require('supertest');
const faker = require('faker');
const app = require('../app');

describe('item', () => {
  let server;
  let agent;
  beforeEach((done) => {
    server = app.listen(4000, (err) => {
      if (err) return done(err);

      agent = request.agent(server); // since the application is already listening, it should use the allocated port
      done();
      return true;
    });
  });

  afterEach((done) => {
    return server && server.close(done);
  });

  let id;
  let typeItemId;

  // **************************************
  // ** POST
  // **************************************
  it('should create an item without isActive', async () => {
    const ty = await agent.get('/api/v1/type_item');
    typeItemId = ty.body[0].id;

    const res = await agent.post('/api/v1/item').send({
      name: faker.lorem.word(),
      imgUrl: faker.lorem.words(5),
      price: faker.datatype.number({
        precision: 5,
      }),
      typeItemId,
    });
    id = res.body.id;
    expect(res.status).toEqual(201);
  });

  it('should create an item with isActive', async () => {
    const res = await agent.post('/api/v1/item').send({
      name: faker.lorem.word(),
      imgUrl: faker.lorem.words(5),
      price: faker.datatype.number({
        precision: 5,
      }),
      typeItemId,
      isActive: faker.datatype.boolean(),
    });
    expect(res.status).toEqual(201);
  });

  it('should create an item with name lengh > 100', async () => {
    const res = await agent.post('/api/v1/item').send({
      name: faker.lorem.words(40),
      price: faker.datatype.number({
        precision: 5,
      }),
      imgUrl: faker.lorem.words(5),
      typeItemId: 'a',
    });
    expect(res.status).toEqual(422);
  });

  it('should create an item without price', async () => {
    const res = await agent.post('/api/v1/item').send({
      name: faker.lorem.word(),
      imgUrl: faker.lorem.words(5),
      typeItemId: 'a',
    });

    expect(res.status).toEqual(422);
  });

  it('should create an item without name', async () => {
    const res = await agent.post('/api/v1/item').send({
      price: faker.datatype.number({
        precision: 5,
      }),
      image_url: faker.lorem.words(5),
      typeItemId: 'a',
    });
    expect(res.status).toEqual(422);
  });

  it('should create an item without img_url', async () => {
    const res = await agent.post('/api/v1/item').send({
      name: faker.lorem.word(),
      price: faker.datatype.number({
        precision: 5,
      }),
      typeItemId: 'a',
    });
    expect(res.status).toEqual(422);
  });

  // **************************************
  // ** UPDATE
  // **************************************
  it('should update an item', async () => {
    const res = await agent.put(`/api/v1/item/${id}`).send({
      name: faker.lorem.word(),
      price: faker.datatype.number({
        precision: 5,
      }),
      imgUrl: faker.lorem.words(5),
      typeItemId,
      isActive: faker.datatype.boolean(),
      updatedAt: new Date(),
    });
    expect(res.status).toEqual(200);
  });

  // **************************************
  // ** GET
  // **************************************
  it('should get all items', async () => {
    const res = await agent.get('/api/v1/item');
    expect(res.status).toEqual(200);
  });

  it('should get one item', async () => {
    const res = await agent.get(`/api/v1/item/${id}`);
    expect(res.status).toEqual(200);
  });

  // **************************************
  // ** DELETE
  // **************************************
  it('should delete one item', async () => {
    const res = await agent.delete(`/api/v1/item/${id}`);
    expect(res.status).toEqual(204);
  });
});
