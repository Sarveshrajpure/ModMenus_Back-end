const QRCode = require("qrcode");

const generateQr = async (text) => {
  try {
    let qr = await QRCode.toDataURL(text);
    return qr;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { generateQr };
