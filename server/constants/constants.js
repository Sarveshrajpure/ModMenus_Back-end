module.exports = {
  APP_VALIDATIONS: {
    idValidation: { version: "uuidv4" },
    strongPasswordRegex:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    phoneRegex: /^[6-9]\d{9}$/,
  },
};
