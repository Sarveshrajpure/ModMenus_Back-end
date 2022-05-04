const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = Joi.object({
  name: Joi.string().min(3).max(225).required(),
  description: Joi.string().min(3).max(225).allow(null, ""),
  categoryId: Joi.objectId().required(),
  price: Joi.string().max(20).required(),
  image: Joi.string().allow(null, ""),
});

const ordersByBusinessId = Joi.object({
  businessId: Joi.objectId().required(),
});

const ordersByGuestId = Joi.object({
  guestId: Joi.objectId().required(),
});

module.exports = {
  orderSchema,
  ordersByBusinessId,
  ordersByGuestId,
};
