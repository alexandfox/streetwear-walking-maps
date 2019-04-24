const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapSchema = new Schema(
  {
		creator: objectId,
		image: String,
		city: String,
		neighborhood: [String],
		places: [Object],
		total_stops: Number,
		total_time: Number,
		favorites: [objectId],
		total_favorites: Number,
		tags: [String],
		clone_from: objectId,
		number_of_clones: Number,
		clones: [objectId],
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
