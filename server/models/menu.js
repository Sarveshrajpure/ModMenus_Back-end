const mongoose = require("mongoose");
require("dotenv").config();

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      maxLength: 100,
      trim: true,
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuReference: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100,
    },
    businessName: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100,
    },
    qrLink: {
      type: String,
      required: false,
      unique: true,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu };
