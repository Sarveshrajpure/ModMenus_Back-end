const { User } = require("../models/user");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const userService = require("./user.service");


const createUser = async (
  email,
  password,
  firstname,
  lastname,
  businessname,
  phone
) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email already taken");
    }

    const user = new User({
      email,
      password,
      firstname,
      lastname,
      businessname,
      phone,
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  try {
    const token = user.generateAuthToken();
    return token;
  } catch (error) {}
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Email");
    }
    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword,
};
