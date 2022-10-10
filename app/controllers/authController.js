const bcrypt = require('bcrypt');
const { omit } = require('ramda');

const models = require('../models/database');

const userController = {
  /* Register Route
    ========================================================= */
  register: async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
      const user = await models.User.create(
        Object.assign(req.body, { password: hash }),
      );

      const data = await user.authorize(user.email, user.password);

      const result = omit(['password'], {
        ...data.user.dataValues,
        token: data.authToken.token,
      });

      return res.json(result);
    } catch (err) {
      console.log('UNE ERREUR AU REGISTER', err);
      return res.status(400).send(err);
    }
  },

  /* Login Route
    ========================================================= */
  login: async (req, res) => {
    const { email, password } = req.body;

    // if the email / password is missing, we use status code 400
    // indicating a bad request was made and send back a message
    if (!email || !password) {
      return res.status(400).send(
        'Request missing email or password param',
      );
    }

    try {
      const user = await models.User.authenticate(email, password);

      return res.json(user);
    } catch (err) {
      return res.status(400).send('invalid email or password');
    }
  },

  /* Logout Route
    ========================================================= */
  logout: async (req, res) => {
    const { user, cookies: { auth_token: authToken } } = req;

    if (user && authToken) {
      await req.user.logout(authToken);
      return res.status(204).send();
    }

    return res.status(400).send(
      { errors: [{ message: 'not authenticated' }] },
    );
  },

  /* Me Route - get the currently logged in user
    ========================================================= */
  me: (req, res) => {
    if (req.user) {
      return res.send(req.user);
    }
    res.status(404).send(
      { errors: [{ message: 'missing auth token' }] },
    );
  },

};

module.exports = userController;
