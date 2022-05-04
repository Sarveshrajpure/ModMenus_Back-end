const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const foodItemSchema = Joi.object({
  name: Joi.string().min(3).max(225).required(),
  description: Joi.string().min(3).max(225).allow(null, ""),
  categoryId: Joi.objectId().required(),
  price: Joi.string().max(20).required(),
  image: Joi.string().allow(null, ""),
});

const updateFoodItemSchema = Joi.object({
  name: Joi.string().min(3).max(225).required(),
  description: Joi.string().max(225).allow(null, ""),
  price: Joi.string().max(20).required(),
  foodItemId: Joi.objectId().required(),
  image: Joi.string().allow(null),
});

const deleteFoodItemSchema = Joi.object({
  foodItemId: Joi.objectId().required(),
});

const fetchFoodItemSchema = Joi.object({
  categoryId: Joi.objectId().required(),
});

module.exports = {
  foodItemSchema,
  updateFoodItemSchema,
  deleteFoodItemSchema,
  fetchFoodItemSchema,
};
