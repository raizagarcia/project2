const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    imageUrl: {
      type: String,
      default: 'https://sm.ign.com/ign_pt/cover/n/nicolas-ca/nicolas-cage_y81t.jpg',
  },
  
});

const User = model("User", userSchema);

module.exports = User;
