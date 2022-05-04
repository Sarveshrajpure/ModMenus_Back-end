const { Order } = require("../models/order");
const { Guest } = require("../models/guest");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");

const findUniqueCustomers = async (businessId) => {
  try {
    let guests = await Guest.find({
      businessId: businessId,
    }).count();
    return guests;
  } catch (error) {
    throw error;
  }
};

const findOrdersStatsByBusinessId = async (businessId) => {
  try {
    let stats = {};

    let ordersActive = await Order.find({
      businessId: businessId,
      status: "placed",
    }).count();

    let ordersServed = await Order.find({
      businessId: businessId,
      status: "placed",
    }).count();

    let orders = await Order.find({
      businessId: businessId,
    });

    let totalRevenue = 0;
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
      totalRevenue = totalRevenue + parseInt(orders[i].total);
    }

    stats = {
      activeOrders: ordersActive,
      servedOrders: ordersServed,
      totalRevenue: totalRevenue,
    };

    return stats;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUniqueCustomers,
  findOrdersStatsByBusinessId,
};
