const mongoose = require("mongoose");

require("dotenv").config();

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },
    time: {
      type: String,
      required: false,
      maxLength: 10,
    },

    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
