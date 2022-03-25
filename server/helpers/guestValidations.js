const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/constants");
Joi.objectId = require("joi-objectid")(Joi);

const phoneError = new Error("Enter a 10 digit valid Phone number");

const registerSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  name: Joi.string().min(4).max(255).required(),
  phone: Joi.string()
    .min(10)
    .max(10)
    .regex(CONSTANTS.APP_VALIDATIONS.phoneRegex)
    .error(phoneError)
    .required(),
  businessId: Joi.objectId().required(),
});

const fetchGuestSchema = Joi.object({
  businessId: Joi.objectId().required(),
});

module.exports = {
  registerSchema,
  fetchGuestSchema,
};
