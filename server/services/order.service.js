const { Order } = require("../models/order");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");

const createOrder = async (
  businessId,
  guestId,
  guestName,
  tableNumber,
  items,
  total,
  status
) => {
  try {
    const order = new Order({
      businessId,
      guestId,
      guestName,
      tableNumber,
      items,
      total,
      status,
    });

    await order.save();
    return order;
  } catch (error) {
    throw error;
  }
};

const findActiveOrdersByBusinessId = async (businessId) => {
  try {
    let orders = await Order.find({ businessId: businessId, status: "placed" });
    return orders;
  } catch (error) {
    throw error;
  }
};

const findActiveOrdersByGuestId = async (guestId) => {
  try {
    let orders = await Order.find(guestId);
    return orders;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrder,
  findActiveOrdersByBusinessId,
  findActiveOrdersByGuestId,
};
