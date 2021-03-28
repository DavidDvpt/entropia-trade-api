const request = require('supertest');
const faker = require('faker');
const app = require('../app');

describe('type_item', () => {
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

  it('should create an type_item without isActive', async () => {
    const res = await agent
      .post('/api/v1/type_item')
      .send({ name: faker.lorem.word() });
    id = res.body.id;
    expect(res.status).toEqual(201);
  });

  it('should create a type_item with isActive', async () => {
    const res = await agent.post('/api/v1/type_item').send({
      name: faker.lorem.word(),
      isActive: faker.datatype.boolean(),
    });
    expect(res.status).toEqual(201);
  });

  it('should create an type_item with name lengh > 50', async () => {
    const res = await agent
      .post('/api/v1/type_item')
      .send({ name: faker.lorem.words(30), isActive: true });
    expect(res.status).toEqual(422);
  });

  it('should create a type_item with empty body', async () => {
    const res = await agent.post('/api/v1/type_item').send({});
    expect(res.status).toEqual(422);
  });

  it('should update a type_item', async () => {
    const res = await agent.put(`/api/v1/type_item/${id}`).send({
      name: faker.lorem.word(),
      isActive: faker.datatype.boolean(),
      updatedAt: new Date(),
    });
    expect(res.status).toEqual(200);
  });

  it('should get type_items', async () => {
    const res = await agent.get('/api/v1/type_item');
    expect(res.status).toEqual(200);
  });

  it('should get a type_item by id', async () => {
    const res = await agent.get(`/api/v1/type_item/${id}`);
    expect(res.status).toEqual(200);
  });

  it('should delete a type_item', async () => {
    const res = await agent.delete(`/api/v1/type_item/${id}`);
    expect(res.status).toEqual(204);
  });
});
