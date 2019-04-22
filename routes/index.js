const express = require('express');
const router  = express.Router();
// const Restaurant = require('../models/restaurant');    --> model example

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/create', (req, res, next) => {
  res.render('create');
});

// const createMap = require('./create');
// app.use('/create', createMap);

module.exports = router;
