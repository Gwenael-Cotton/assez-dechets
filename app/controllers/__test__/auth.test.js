const request = require('supertest');
const app = require('../../index');
// const agent = require('supertest').agent(app);
const { sequelize } = require('../../models/database');

describe('Should be register', () => {
  beforeAll(() => {
    sequelize.sync({ force: true });
  });

  afterAll(() => {
    sequelize.close();
  });

  const mockUser = expect.objectContaining({
    firstName: expect.any(String),
    lastName: expect.any(String),
    email: expect.any(String),
    // password: expect.any(String),
    numberParticipations: expect.any(Number),
    id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });

  test('POST /api/register success', async () => {
    const agent = request.agent(app);
    const user = {
      firstName: 'tests',
      lastName: 'testname',
      email: 'test999@gmail.com',
      password: 'Superpass41*',
    };

    agent
      .post('/api/register')
      .send(user)
      .expect(201);
  });

  test.skip('POST /api/register error', async () => {
    const tru = 0;
  });
});
