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

router.post("/create", (req, res, next) => {
  console.log(req.body)
  // req.body.newMap.user = {}  --> need to add user info

  const newMapDoc = JSON.parse(req.body.newMap)
  MapModel.create(newMapDoc)
    .then( res => {
      console.log("res = ", res)
      console.log("res.body = ", res.body)
      res.render(`/map/${res.body._id}`)
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
