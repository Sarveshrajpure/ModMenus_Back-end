require("dotenv").config();
module.exports = {
  APP: {
    Menu_Front_end_link: process.env.FRONT_END_MENU_LINK,
  },
  APP_VALIDATIONS: {
    idValidation: { version: "uuidv4" },
    strongPasswordRegex:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    phoneRegex: /^[6-9]\d{9}$/,
    tableNumberRegEx: /^[1-9][0-9]*$/,
  },
};
