const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const categorySchema = Joi.object({
  name: Joi.string().min(4).max(255).required("Category name required"),
  time: Joi.string().max(20),
  menuId: Joi.objectId().required(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(4).max(255).required("Category name required"),
  time: Joi.string().min(4).max(225),
  categoryId: Joi.objectId().required(),
});

const deleteCategorySchema = Joi.object({
  categoryId: Joi.objectId().required(),
});

const fetchCategorySchema = Joi.object({
  menuId: Joi.objectId().required(),
});

const fetchCategoryByIdSchema = Joi.object({
  categoryId: Joi.objectId().required(),
});

module.exports = {
  categorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  fetchCategorySchema,
  fetchCategoryByIdSchema,
};
