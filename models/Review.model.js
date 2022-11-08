const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Review = model("Reviews", reviewSchema);
module.exports = Review;