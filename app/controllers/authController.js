/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { omit } = require('ramda');
const {
  INVALID_EMAIL_OR_PASSWORD,
  MISSING_EMAIL_PASSWORD,
  GENERIC_ERROR,
  WRONG_TOKEN,
} = require('../constants');

const models = require('../models/database');
const { generateUserToken } = require('../service/auth/generateJwt');

const authController = {
  register: async (req, res) => {
    const userData = req.body;
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const user = await models.User.create(userData);
      const userWithoutPassword = omit(['password'], user.dataValues);

      res.status(201);
      res.json(userWithoutPassword);
    } catch (e) {
      // console.error(e);
      res.status(500).send(e);
    }
  },

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
          error: INVALID_EMAIL_OR_PASSWORD,
        });
      }

      // verify if password in the body are same in database
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
          error: INVALID_EMAIL_OR_PASSWORD,
        });
      }

      const userWithoutPassword = omit(['password'], user.dataValues);

      const { access_token, refresh_token } = await generateUserToken(user);
      res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      // res.json({ user, access_token });
      res.status(200).json({ userWithoutPassword, access_token });
    } catch (e) {
      res.status(500).json({
        message: GENERIC_ERROR,
      });
    }
  },

  logout: (_, res) => {
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.status(200).json({ message: 'logout' });
  },

  refreshToken: async (req, res) => {
    const token = req.cookies.refresh_token;
    try {
      const decodedData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const user = await models.User.findByPk(decodedData.id);
      const { access_token } = await generateUserToken(user);

      res.json({ access_token });
    } catch (e) {
      res.status(401).json({
        error: WRONG_TOKEN,
      });
    }
  },

};

module.exports = authController;
