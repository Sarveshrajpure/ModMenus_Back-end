const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const itemDetails = Joi.object().keys({
  name: Joi.string().min(3).max(225).required(),
  description: Joi.string().min(3).max(225).allow(null, ""),
  categoryId: Joi.objectId().required(),
  images: Joi.array(),
});

const foodItemSchema = Joi.array().items(itemDetails);

const updateFoodItemSchema = Joi.object({
  name: Joi.string().min(3).max(225).required(),
  description: Joi.string().max(225).allow(null, ""),
  foodItemId: Joi.objectId().required(),
});

const deleteFoodItemSchema = Joi.object({
  foodItemId: Joi.objectId(),
});

module.exports = {
  foodItemSchema,
  updateFoodItemSchema,
  deleteFoodItemSchema,
};
