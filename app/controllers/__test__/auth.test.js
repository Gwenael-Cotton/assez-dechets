const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../index');
const { sequelize } = require('../../models/database');
const {
  MISSING_EMAIL_PASSWORD,
  PASSWORD_REQUIREMENTS,
} = require('../../constants');

const thisDb = sequelize;
beforeAll(async () => {
  await thisDb.sync({ force: true });
});

afterAll(async () => {
  await thisDb.close();
});

describe('Should be register', () => {
  test('POST /api/register success', async () => {
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: 'test1@gmail.com',
      password: 'Superpass41*',
      // numberParticipations: 0,
    };
    const res = await request(app)
      .post('/api/register')
      .send(user)
      .expect(201);

    expect(res.body).toMatchObject({
      numberParticipations: 0,
      id: 1,
      firstName: 'test2',
      lastName: 'testname',
      email: 'test1@gmail.com',
    });
  });

  test('POST /api/register with bad email should be return an error', async () => {
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: '',
      password: 'Superpass41*',
    };
    const res = await request(app)
      .post('/api/register')
      .send(user)
      .expect(400);

    const error = JSON.parse(res.error.text);

    expect(error).toMatchObject({
      type: 'ValidationError',
      message: 'body.email is a required field',
    });
  });

  test('POST /api/register with bad password should be return an error', async () => {
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: 'test2@test.com',
      password: 'superpass',
    };
    const res = await request(app)
      .post('/api/register')
      .send(user)
      .expect(400);

    const error = JSON.parse(res.error.text);

    expect(error).toMatchObject({
      type: 'ValidationError',
      message: PASSWORD_REQUIREMENTS,
    });
  });
});

describe('Should be login', () => {
  test('POST /api/login should be a success', async () => {
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: 'test3@gmail.com',
      password: 'Superpass41*',
    };
    const register = await request(app)
      .post('/api/register')
      .send(user)
      .expect(201);

    const registerResponse = JSON.parse(register.res.text);

    const userLog = {
      email: registerResponse.email,
      password: user.password,
    };

    await request(app)
      .post('/api/login')
      .send(userLog)
      .expect(200);
  });

  test('POST /api/login should be return an error (Missing email or password in parameters)', async () => {
    const userLogWithoutEmail = {
      password: 'Superpass41*',
    };
    const userLogWithoutPassword = {
      email: 'test4@gmail.com',
    };

    const resWithoutEmail = await request(app)
      .post('/api/login')
      .send(userLogWithoutEmail)
      .expect(400);

    const resWithoutPassword = await request(app)
      .post('/api/login')
      .send(userLogWithoutPassword)
      .expect(400);

    const errorMail = resWithoutEmail.error.text;
    const errorPassword = resWithoutPassword.error.text;
    expect(errorMail).toBe(MISSING_EMAIL_PASSWORD);
    expect(errorPassword).toBe(MISSING_EMAIL_PASSWORD);
  });

  test('POST /api/login should be return an error (invalid email or password)', async () => {
    const userLogBadPassword = {
      password: 'superpass',
    };
    const userLogBadEmail = {
      email: 'test',
    };

    const resBadEmail = await request(app)
      .post('/api/login')
      .send(userLogBadEmail)
      .expect(400);

    const resBadPassword = await request(app)
      .post('/api/login')
      .send(userLogBadPassword)
      .expect(400);

    const errorMail = resBadEmail.error.text;
    const errorPassword = resBadPassword.error.text;
    expect(errorMail).toBe(MISSING_EMAIL_PASSWORD);
    expect(errorPassword).toBe(MISSING_EMAIL_PASSWORD);
  });

  test('POST /api/login should be not return token ', async () => {
    // WHEN
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: 'test5@gmail.com',
      password: 'Superpass41*',
    };
    // THEN
    await request(app)
      .post('/api/register')
      .send(user)
      .expect(201);

    const userLog = {
      email: user.email,
      // password: user.password,
    };

    const res = await request(app)
      .post('/api/login')
      .send(userLog);
      // .expect(200);

    // RETURN
    expect(res.body).not.toHaveProperty('access_token');
    expect(res.body).toStrictEqual({});
    expect(res.header['set-cookie']).toBe(undefined);
  });

  test('POST /api/login should be return token ', async () => {
    // WHEN
    const user = {
      firstName: 'test2',
      lastName: 'testname',
      email: 'test6@gmail.com',
      password: 'Superpass41*',
    };
    // THEN
    await request(app)
      .post('/api/register')
      .send(user)
      .expect(201);

    const userLog = {
      email: user.email,
      password: user.password,
    };

    const res = await request(app)
      .post('/api/login')
      .send(userLog)
      .expect(200);

    const cookie = res.header['set-cookie'];
    // RETURN
    expect(res.body).toHaveProperty('access_token');
    expect(cookie[0]).toMatch('refresh_token');
  });

  // wrong test
  test.skip('POST /api/login should be compare password', async () => {
    const hashPassword = await bcrypt.hash('Superpass41*', 10);
    const mockDb = {
      numberParticipations: 0,
      id: 5,
      firstName: 'tests',
      lastName: 'testname',
      email: 'test7@gmail.com',
      password: hashPassword,
      updatedAt: '2022-11-01T00:58:53.148Z',
      createdAt: '2022-11-01T00:58:53.148Z',
    };

    const bodyWithGoodPassword = {
      email: 'test7@gmail.com',
      password: 'Superpass41*',
    };

    const bodyWithBadPassword = {
      email: 'test7@gmail.com',
      password: 'upeRpass41*',
    };

    const isValidPassword = await bcrypt.compare(bodyWithGoodPassword.password, mockDb.password);
    const isInvalidPassword = await bcrypt.compare(bodyWithBadPassword.password, mockDb.password);

    expect(isValidPassword).toBe(true);
    expect(isInvalidPassword).toBe(false);
  });
});
