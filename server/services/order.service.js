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
    let orders = await Order.find({
      businessId: businessId,
      status: "placed",
    }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

const findActiveOrdersByGuestId = async (guestId) => {
  try {
    let orders = await Order.find({ guestId: guestId, status: "placed" }).sort({
      createdAt: -1,
    });
    return orders;
  } catch (error) {
    throw error;
  }
};

const updateOrderStatus = async (orderId) => {
  try {
    let orders = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: "served" } }
    );
    return orders;
  } catch (error) {}
};

module.exports = {
  createOrder,
  findActiveOrdersByBusinessId,
  findActiveOrdersByGuestId,
  updateOrderStatus,
};
