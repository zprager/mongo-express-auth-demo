var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is a protected route and you made it here. You are authenticated!');
});

module.exports = router;
