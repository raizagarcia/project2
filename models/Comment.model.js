const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: String,
  placeId: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;
