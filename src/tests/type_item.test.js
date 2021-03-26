const request = require('supertest');
const app = require('../index');

describe('Get Endpints', () => {
  it('should creat an type_item', async () => {
    const res = await request(app)
      .post('/api/v1/type_Item')
      .send({ id: 'a', name: 'testname', isActive: true });
    expect(res.statusCode).equal(201);
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
