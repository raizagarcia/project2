const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
  rating: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  /*author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },*/
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
