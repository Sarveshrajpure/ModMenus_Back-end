const { Menu } = require("../models/menu");
const ApiError = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createMenu = async (name, businessId, menuReference, businessName) => {
  try {
    console.log(businessName);
    let menuCreated = new Menu({
      name,
      businessId,
      menuReference,
      businessName,
    });

    await menuCreated.save();

    return menuCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findDefaultMenu = async (businessId) => {
  try {
    let findMenuByBusinessId = await Menu.findOne({ businessId });
    return findMenuByBusinessId;
  } catch (error) {
    throw error;
  }
};

const findMenuByReference = async (menuReference) => {
  try {
    let findMenuByReference = await Menu.findOne({ menuReference });
    return findMenuByReference;
  } catch (error) {
    throw error;
  }
};

const updateQrInMenu = async (qrLink, menuId) => {
  try {
    console.log(qrLink);
    let updateQrLink = await Menu.findByIdAndUpdate(menuId, { qrLink: qrLink });
    console.log(updateQrLink);
    return updateQrLink;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  createMenu,
  findDefaultMenu,
  findMenuByReference,
  updateQrInMenu,
};
