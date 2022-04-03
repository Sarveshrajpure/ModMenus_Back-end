require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadQrToCouldinary = async (QrCode) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(QrCode, {
      upload_preset: "ModMenus_Qrs",
    });

    console.log(uploadedResponse);
    return uploadedResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { uploadQrToCouldinary };
