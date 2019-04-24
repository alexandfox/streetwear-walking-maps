const express = require('express');
const router  = express.Router();
const Map = require("../models/map")
// const Restaurant = require('../models/restaurant');    --> model example

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/create', (req, res, next) => {
  res.render('create');   // pass city and user info
});

router.get('/map', (req, res, next) => {
  res.render('map');   // pass map info
});

router.get('/map/:id', (req, res, next) => {
  let mapID = req.params.id
  if (!/^[0-9a-fA-F]{24}$/.test(mapID)) { 
    return res.status(404).render('not-found');
  }
  Map.findOne({'_id': mapID})
    .populate("user")
    .then( map => {
      if (!map) {
        return res.status(404).render('not-found');
      }
      res.render('map', {map: JSON.stringify(map)})
    })
    .catch(next)
});

// const createMap = require('./create');
// app.use('/create', createMap);

module.exports = router;
