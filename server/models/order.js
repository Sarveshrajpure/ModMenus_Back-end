const mongoose = require("mongoose");
require("dotenv").config();

const orderSchema = mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guestName: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: [],
    },
    total: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
