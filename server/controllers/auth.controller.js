const {
  authService,
  emailService,
  menuService,
  qrservice,
  cloudinaryservice,
} = require("../services");
const { registerSchema, loginSchema } = require("../helpers/userValidations");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { User } = require("../models/user");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 6 });
const CONSTANTS = require("../constants/constants");

const authController = {
  async register(req, res, next) {
    try {
      //validate user register data using joi schema
      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        //check if email is unique in mongo
        if (await User.emailTaken(value.email)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Sorry email already taken"
          );
        }

        //check if business name is unique in mongo
        if (await User.businessnameTaken(value.businessname)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Sorry Business Name already taken"
          );
        }

        //create new user in mongo
        let user = await authService.createUser(
          value.email,
          value.password,
          value.firstname,
          value.lastname,
          value.businessname,
          value.phone
        );

        // create default menu for business
        let menuName = user.businessname + "_menu";
        let menuReference = uid();
        let businessName = user.businessname;

        let createDefaultMenu = await menuService.createMenu(
          menuName,
          user.id,
          menuReference,
          businessName
        );
        //Create a QR code for menu
        let menuLink = `${CONSTANTS.APP.Menu_Front_end_link}/menu/${createDefaultMenu.menuReference}`;
        let QrCode = await qrservice.generateQr(menuLink);

        //Upload qr to cloudinary

        let uploadQr = await cloudinaryservice.uploadQrToCouldinary(QrCode);
        //Update Qr link in menu
        let menuId = createDefaultMenu._id;
        let qrLink = uploadQr.secure_url;
        let updateQrLink = await menuService.updateQrInMenu(qrLink, menuId);

        ///send register email
        await emailService.registerEmail(value.email, value.firstname, user);

        res.status(httpStatus.CREATED).send({
          user,
          defaultMenu: createDefaultMenu,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async signin(req, res, next) {
    try {
      //validate user login data using joi schema
      let value = await loginSchema.validateAsync(req.body);
      if (value) {
        const user = await authService.signInWithEmailAndPassword(
          value.email,
          value.password
        );
        //set access token
        let token = await authService.genAuthToken(user);
        // fetch default menu
        let menuInfo = await menuService.findDefaultMenu(user.id);

        //set access token to cookies
        res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
          user,
          menuInfo,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async isauth(req, res, next) {
    res.json(req.user);
  },
};

module.exports = authController;
