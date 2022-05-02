require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImgToCouldinary = async (fooditemImg, upload_folder) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(fooditemImg, {
      upload_preset: upload_folder,
    });

    return uploadedResponse;
  } catch (error) {
    throw error;
  }
};

const deleteCloudinaryImg = async (public_id) => {
  try {
    const deleteImg = await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadImgToCouldinary, deleteCloudinaryImg };
