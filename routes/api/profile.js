const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Profile api');
});

module.exports = router;
