const { guestService } = require("../services");
const {
  registerSchema,
  fetchGuestSchema,
} = require("../helpers/guestValidations");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { Guest } = require("../models/guest");

const guestController = {
  async register(req, res, next) {
    try {
      //validate guest register data using joi schema
      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        let guest = "";
        //check if phone is unique in mongo
        if ((guest = await Guest.phoneTaken(value.phone, value.businessId))) {
          console.log(guest);
          res.status(httpStatus.OK).send({
            guest,
          });
        }
        //check if email is unique in mongo
        else if (
          (guest = await Guest.emailTaken(value.email, value.businessId))
        ) {
          res.status(httpStatus.OK).send({
            guest,
          });
        } else {
          //create new Guest in mongo
          guest = await guestService.createGuest(
            value.email,
            value.name,
            value.phone,
            value.businessId
          );

          res.status(httpStatus.CREATED).send({
            guest,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async addToCart(req, res, next) {
    try {
      let value = req.body;

      if (value) {
        let guest = await guestService.putInCart(value.id, value.cartItems);

        res.status(httpStatus.OK).send({
          guest,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async fetchCart(req, res, next) {
    try {
      let value = req.params;

      if (value) {
        let cart = await guestService.getCart(value.id);

        res.status(httpStatus.OK).send({
          cart,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async fetchGuests(req, res, next) {
    try {
      //validate guest fetch data-"businessId" using joi schema
      let value = await fetchGuestSchema.validateAsync(req.body);

      if (value) {
        let guestList = await guestService.getGuests(value.businessId);

        res.status(httpStatus.FOUND).send({
          guestList,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = guestController;
