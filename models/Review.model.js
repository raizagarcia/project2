const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  rating: { type: Number, required: true },
});

const Review = model("Review", reviewSchema);
module.exports = Review;
