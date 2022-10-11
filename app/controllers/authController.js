/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { omit } = require('ramda');
const {
  USER_NOT_FOUND,
  INVALID_EMAIL_OR_PASSWORD,
  NOT_AUTHENTICATED,
  REFRESH_TOKEN_MISSING,
  MISSING_EMAIL_PASSWORD,
  AUTH_TOKEN_MISSING,
} = require('../constants');
const {
  signAccessToken, signRefreshToken, verifyRefreshToken,
} = require('../helpers/jwtHelpers');

const models = require('../models/database');
const { generateUserToken } = require('../service/auth/generateJwt');

const authController = {
  /* Register Route
    ========================================================= */
  register: async (req, res) => {
    const userData = req.body;
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const user = await models.User.create(userData);
      const userWithoutPassword = omit(['password'], user.dataValues);

      res.status(201);
      res.json(userWithoutPassword);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  },

  /* Login Route
    ========================================================= */
  login: async (req, res) => {
    const { email, password } = req.body;

    // if the email / password is missing, we use status code 400
    // indicating a bad request was made and send back a message
    if (!email || !password) {
      return res.status(400).send(MISSING_EMAIL_PASSWORD);
    }

    try {
      // get user with email
      const user = await models.User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(401).json({
          error: 'Bad credential',
        });
      }

      // verify if password in the body are same in database
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
          error: 'Bad credential',
        });
      }

      const { access_token, refresh_token } = await generateUserToken(user);

      res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ user, access_token });
    } catch (e) {
      res.status(500).json({
        message: 'Oups...',
      });
    }
  },

  refreshToken: async (req, res) => {
    const token = req.cookies.refresh_token;

    try {
      const decodedData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const user = await models.User.findByPk(decodedData.id);
      const tokens = generateUserToken(user);

      res.json(tokens);
    } catch (e) {
      res.status(401).json({
        error: 'Bad token',
      });
    }
  },

};

module.exports = authController;
