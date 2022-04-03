const { string } = require("@hapi/joi");
const mongoose = require("mongoose");
require("dotenv").config();

const foodItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxLength: 250,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: String,
      required: true,
      maxLength: 20,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = { FoodItem };
