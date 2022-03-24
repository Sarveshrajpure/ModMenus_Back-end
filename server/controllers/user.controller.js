const { User } = require("../models/user");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { userService } = require("../services");
const { verify } = require("jsonwebtoken");

const userController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);

      if (!user) {
        new ApiError(httpStatus.NOT_FOUND, "User not Found");
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async verifyAccount(req, res, next) {
    try {
      const token = await userService.validateToken(req.query.validation);
      const user = await userService.findUserById(token.sub);

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      if (user.verified) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Already Verified");
      }

      user.verified = true;

      user.save();

      res.status(httpStatus.CREATED).send(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
