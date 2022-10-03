const models = require('../models/database');

const userController = {
  createUser: async (req, res) => {
    try {
      const user = await models.User.create(req.body);
      return res.status(201).json({
        user,
      });
    } catch (error) {
      console.log('Error creating user');
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
