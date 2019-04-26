require("dotenv").config();

const mongoose = require("mongoose");
const maps = require("../API/maps.json");
const users = require("../API/users.json");
const MapModel = require("../models/map");
const UserModel = require("../models/user");

// process.env.MONGODB_URI
// mongodb://localhost/streetwear-walking-maps

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


MapModel.insertMany(maps)
	.then(results => {
		console.log(`Inserted ${results.length} MAPS!`);
	})
	.catch(err => {
		console.log("Map ERROR!", err);
	});

UserModel.insertMany(users)
	.then(results => {
		console.log(`Inserted ${results.length} USERS!`);
	})
	.catch(err => {
		console.log("User ERROR!", err);
	});