const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgRestaurant: String,
  placeId: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
