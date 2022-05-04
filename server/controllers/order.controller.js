const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { orderService, guestService } = require("../services");
const { Order } = require("../models/order");

const orderController = {
  async placeOrder(req, res, next) {
    try {
      let value = req.body;

      if (value) {
        let order = "";
        //create new Order in mongo
        order = await orderService.createOrder(
          value.businessId,
          value.guestId,
          value.guestName,
          value.tableNumber,
          value.items,
          value.total,
          value.status
        );

        if (order) {
          let guest = await guestService.putInCart(value.guestId, []);

          res.status(httpStatus.CREATED).send({
            order,
            guest,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
