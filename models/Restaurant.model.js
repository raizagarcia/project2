const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  placeId: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  /*author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },*/
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
