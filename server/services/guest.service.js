const { Guest } = require("../models/guest");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");

const createGuest = async (email, name, phone, businessId) => {
  try {
    if (await Guest.phoneTaken(phone)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Phone already exists");
    }

    if (await Guest.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }

    const guest = new Guest({
      email,
      name,
      phone,
      businessId,
    });

    await guest.save();
    return guest;
  } catch (error) {
    throw error;
  }
};

const getGuests = async (businessId) => {
  try {
    let guestList = {};
    let count = await Guest.find({ businessId: businessId }).count();
    let guests = await Guest.find(
      { businessId: businessId },
      { name: 1, email: 1, phone: 1, _id: 0 }
    );

    guestList = {
      count,
      guests,
    };
    return guestList;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createGuest,
  getGuests,
};
