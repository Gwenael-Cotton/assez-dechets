const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../../models/database');
const { generateUserToken } = require('../../service/auth/generateJwt');
// const { sequelize, User } = require('../../models/user');

describe('Should be register', () => {
  beforeAll(() => {
    sequelize.sync({ force: true });
  });

  afterAll(() => {
    sequelize.close();
  });

  test('POST /api/register success', () => {
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

  // test('POST /api/login success', async () => {
  //   const agent = request.agent(app);
  //   const user = {
  //     email: 'test84@gmail.com',
  //     password: 'Superpass41*',
  //   };

  //   const { access_token, refresh_token } = await generateUserToken(user);

  //   await agent
  //     .post('/api/login')
  //     .send({user, access_token})
  //     .expect(200);
  // });
});
