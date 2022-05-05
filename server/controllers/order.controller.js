const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { orderService, guestService } = require("../services");
const { Order } = require("../models/order");
const {
  ordersByBusinessId,
  ordersByGuestId,
} = require("../helpers/orderValidation");

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
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async getActiveOrdersByBusinessId(req, res, next) {
    try {
      let value = await ordersByBusinessId.validateAsync(req.params);

      let orders = await orderService.findActiveOrdersByBusinessId(
        value.businessId
      );
      res.status(httpStatus.OK).send(orders);
    } catch (error) {
      next(error);
    }
  },

  async getActiveOrdersByGuestId(req, res, next) {
    try {
      let value = await ordersByGuestId.validateAsync(req.params);

      let orders = await orderService.findActiveOrdersByGuestId(value.guestId);
      res.status(httpStatus.OK).send(orders);
    } catch (error) {
      next(error);
    }
  },
  async updateOrderStatus(req, res, next) {
    try {
      let values = req.body;
      let orderUpdate = await orderService.updateOrderStatus(values.orderId);
      console.log(orderUpdate);
      if (orderUpdate) {
        res
          .status(httpStatus.OK)
          .send({ message: "order status updated successfully!" });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
