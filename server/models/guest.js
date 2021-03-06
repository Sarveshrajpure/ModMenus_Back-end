const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();

const guestSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    name: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },

    phone: {
      type: String,
      require: true,
      maxLength: 12,
      trim: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

guestSchema.statics.phoneTaken = async function (phone, businessId) {
  const user = await this.findOne({ phone });
  return user;
};

guestSchema.statics.emailTaken = async function (email, businessId) {
  const user = await this.findOne({ email });
  return user;
};

const Guest = mongoose.model("Guest", guestSchema);

module.exports = { Guest };
