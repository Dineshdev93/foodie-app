const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "users",
      required: true,
    },
    recipeid: {
      type: Schema.ObjectId,
      ref: "recipes",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewDb = mongoose.model("reviews", reviewSchema);
module.exports = reviewDb;
