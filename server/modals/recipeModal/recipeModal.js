const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    recipename: {
      type: String,
      required: true,
    },
    recipeImg: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    ingradients:  {
      type: [String],
      required: true,
    },
    cookingtime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const recipeModel = new mongoose.model("recipes", recipeSchema);
module.exports = recipeModel;
