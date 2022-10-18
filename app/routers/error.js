const express = require('express');

const { CONTENT_NOT_FOUND } = require('../constants');

const router = express.Router();

router.use((req, res) => {
  res.status(404).json({ message: CONTENT_NOT_FOUND });
});

module.exports = router;
