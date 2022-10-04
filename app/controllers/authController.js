const bcrypt = require('bcrypt');

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
      // const data = await user.authorize();

      return res.json(data);
    } catch (err) {
      console.log('UNE ERREUR AU REGISTER', err);
      return res.status(400).send(err);
    }
  },

  /* Login Route
    ========================================================= */
  login: async (req, res) => {
    const { username, password } = req.body;

    // if the username / password is missing, we use status code 400
    // indicating a bad request was made and send back a message
    if (!username || !password) {
      return res.status(400).send(
        'Request missing username or password param',
      );
    }

    try {
      let user = await models.User.authenticate(username, password);

      user = await user.authorize();

      return res.json(user);
    } catch (err) {
      return res.status(400).send('invalid username or password');
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
