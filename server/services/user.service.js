const { User } = require("../models/user");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const validateToken = async (token) => {
  return jwt.verify(token, process.env.DB_SECRET);
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserById = async (_id) => {
  return User.findById(_id);
};

const updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          ...req.body.data,
        },
      },
      { new: true }
    );

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  validateToken,
};
