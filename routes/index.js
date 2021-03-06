const express = require("express");
const axios = require('axios')

const router = express.Router();
const MapModel = require("../models/map");
const User = require("../models/user")
const db = "mongodb://localhost/streetwear-walking-maps";

router.get("/", (req, res, next) => {
  MapModel.find({}, null, { sort: {total_favorites: -1 }})
    .populate("user")
    .then(mapData => {
      res.render("index", { mapData });
    });
});

router.get("/create", (req, res, next) => {
  res.render("create"); // pass city and user info
});

router.get("/create/:id", (req, res, next) => {
  let mapID = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(mapID)) {
    return res.status(404).render("not-found");
  }
  MapModel.findOne({ _id: mapID })
    .populate("user")
    .then(map => {
      if (!map) {
        return res.status(404).render("not-found");
      }
      console.log("here i am in the create roupe, here is the map: ", map)
      res.render('create', {hbsMap: map, cloneMap: JSON.stringify(map)})
    })
    .catch(next);
});

router.post("/create", (req, res, next) => {
  console.log(req.body)
  // req.body.newMap.user = {}  --> need to add user info

  const newMapDoc = JSON.parse(req.body.newMap)
  MapModel.create(newMapDoc)
    .then( mapData => {
      res.redirect(`/map/${mapData._id}`)
    })
    .catch( err => {
      console.log("error: ", err)
      next(err)
    })
})

router.get("/map", (req, res, next) => {
  res.render("map"); // pass map info
});

router.get("/map/:id", (req, res, next) => {
  let mapID = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(mapID)) {
    return res.status(404).render("not-found");
  }
  MapModel.findOne({ _id: mapID })
    .populate("user")
    .then(map => {
      if (!map) {
        return res.status(404).render("not-found");
      }
      res.render('map', {hbsMap: map, map: JSON.stringify(map)})
    })
    .catch(next);
});


// const createMap = require('./create');
// app.use('/create', createMap);

module.exports = router;
