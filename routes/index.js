const express = require("express");
const router = express.Router();
const MapModel = require("../models/map");
const db = "mongodb://localhost/streetwear-walking-maps";

router.get("/", (req, res, next) => {
  MapModel.find().then(mapData => {
    console.log(mapData, "map data ");

    res.render("index", { mapData });
  });
});

router.get("/create", (req, res, next) => {
  res.render("create"); // pass city and user info
});

router.get("/map", (req, res, next) => {
  res.render("map"); // pass map info
});

router.get("/map/:id", (req, res, next) => {
  let mapID = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(mapID)) {
    return res.status(404).render("not-found");
  }
  Map.findOne({ _id: mapID })
    .populate("user")
    .then(map => {
      if (!map) {
        return res.status(404).render("not-found");
      }
      res.render("map", { map: JSON.stringify(map) });
    })
    .catch(next);
});

// const createMap = require('./create');
// app.use('/create', createMap);

module.exports = router;
