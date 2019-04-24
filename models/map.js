const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user")

const mapSchema = new Schema(
  {
		map: Object,
		user: { type : Schema.Types.ObjectId, ref: 'User' },
		image: String,
		city: String,
		neighborhood: [String],
		places: [Object],
		total_stops: Number,
		total_time: Number,
		favorites: [{ type : Schema.Types.ObjectId, ref: 'User' }],
		total_favorites: Number,
		tags: [String],
		clone_from: { type : Schema.Types.ObjectId, ref: 'Map' },
		number_of_clones: Number,
		clones: [{ type : Schema.Types.ObjectId, ref: 'Map' }],
		local_rank: Number,
		global_rank: Number,
		guide_notes: String,
		place_notes: [String],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Map = mongoose.model("Map", mapSchema);

module.exports = Map;

var japanMap = new Map({
	map: {
		origin: {'placeId': "ChIJ5aWLOK-MGGARKLfmcEDDvkE"},
		destination: {'placeId': "ChIJU9Ydb2GLGGAR5UIVmYONRiU"},
		travelMode: "WALKING",
		waypoints: [
			{location: {'placeId': "ChIJHTQ2_qWMGGARK_lj8y-fYRE"}},
			{location: {'placeId': "ChIJCzp6MKGMGGARHw84njJix8c"}},
			{location: {'placeId': "ChIJoQkPWaGMGGARKKaniscvhas"}},
			{location: {'placeId': "ChIJ9WtFk6SMGGARVuEQhQtcrcw"}},
			{location: {'placeId': "ChIJzdgvf6OMGGARnxNSOWekExE"}},
			{location: {'placeId': "ChIJ83ZdS2CLGGAREqhGUhmJ9pM"}},
			{location: {'placeId': "ChIJlarnCmGLGGARJSZpRnbZg4c"}},
		],
		optimizeWaypoints: false,
		provideRouteAlternatives: false,
		avoidFerries: false,
		avoidHighways: false,
		avoidTolls: false,
	},
	user: "5cc043158151450c84757422",
	image: "",
	city: "Tokyo",
	neighborhood: ["Shibuya", "Harajuku", "Omote-sando"],
	places: [],
	total_stops: 9,
	total_time: 41,
	favorites: [],
	total_favorites: 0,
	tags: ["local","classic"],
	clone_from: null,
	number_of_clones: 0,
	clones: [],
	local_rank: 1,
	global_rank: 1,
	guide_notes: "Start and explore through Shibuya",
	place_notes: [],
})

// ADD Japan Map
// japanMap.save() 
//   .then(map => { console.log('The map was created: ', map) })
//   .catch(err => { console.log('An error occured', err) });

// Map.findByIdAndUpdate('5cc04c3bfb7fa611209ceb6c')
//   .then( map => {
//     map.map.waypoints = [
// 			{'placeId': "ChIJHTQ2_qWMGGARK_lj8y-fYRE"},
// 			{'placeId': "ChIJCzp6MKGMGGARHw84njJix8c"},
// 			{'placeId': "ChIJoQkPWaGMGGARKKaniscvhas"},
// 			{'placeId': "ChIJ9WtFk6SMGGARVuEQhQtcrcw"},
// 			{'placeId': "ChIJzdgvf6OMGGARnxNSOWekExE"},
// 			{'placeId': "ChIJ83ZdS2CLGGAREqhGUhmJ9pM"},
// 			{'placeId': "ChIJlarnCmGLGGARJSZpRnbZg4c"},
// 		]
//     return map.save(); 
//   })
//   .then(map => { console.log('The map was updated: ' + map )})
//   .catch(err => { console.log('An error occured:', err) });




/* map object:
{
  origin: LatLng | String | google.maps.Place,
  destination: LatLng | String | google.maps.Place,
  travelMode: TravelMode,
  transitOptions: TransitOptions,
  drivingOptions: DrivingOptions,
  unitSystem: UnitSystem,
  waypoints[]: DirectionsWaypoint,
  optimizeWaypoints: Boolean,
  provideRouteAlternatives: Boolean,
  avoidFerries: Boolean,
  avoidHighways: Boolean,
  avoidTolls: Boolean,
  region: String
}
*/