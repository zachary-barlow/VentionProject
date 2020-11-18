const express = require('express');
const router = express.Router();

const inv = require('../controller/controller.js');

router.post('/', (req, res) => {
  console.log(`Request method: ${req.method} Endpoint: /login`);
  inv.login(req, res);
});

module.exports = router;