const request = require('supertest');
const { sequelize } = require('../../models/database');
const app = require('../../index');
// const agent = require('supertest').agent(app);
// const { sequelize, User } = require('../../models/user');

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
    const user = {
      firstName: 'tests',
      lastName: 'testname',
      email: 'test999@gmail.com',
      password: 'Superpass41*',
      numberParticipations: 0,
    };

    const res = await request(app).post('/api/register').send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockUser);
    // expect(res.body).toMatchObject(user);
  });

  test('POST /api/register error', async () => {
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: 'testfgfh3@gmail.com',
      // password: 'Superpass41*',
      // numberParticipations: 0,
    };

    const res = await request(app).post('/api/register').send(user);

    expect(res.statusCode).toBe(500);
    // expect(res.body).toEqual(mockUser);
    // expect(res.body).toMatchObject(user);
  });
});
