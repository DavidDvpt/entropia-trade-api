const request = require('supertest');
const app = require('../app');

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

describe('Get Endpints', () => {
  it('should creat an type_item', async () => {
    // await request(app)
    const res = await agent
      .post('/api/v1/type_item')
      .send({ name: 'testname', isActive: true });
    expect(res.status).toBe(201);
    expect(res.status).toEqual(201);

    // expect(res.body).toHaveProperty('post');
  });
});

// describe('Get Endpints', () => {
//   it('should get all types ', async () => {
//     const res = await request(app)
//     .get('/api/v1/type_Item')
//     .
//   });
// });
