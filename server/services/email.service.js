const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerEmail = async (useremail, userName, user) => {
  try {
    const emailToken = user.generateRegisterToken();

    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mod Menus",
        link: `${process.env.EMAIL_MAIL_URL}`,
      },
    });

    const email = {
      body: {
        name: userName,
        intro: "Welcome to ModMenus!  We're very excited to have you on board.",
        action: {
          instructions: "To verify your email, please click here:",
          button: {
            color: "#1a73e8",
            text: "Verify Email",
            link: `${process.env.EMAIL_MAIL_URL}verification?t=${emailToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL,
      to: useremail,
      subject: "Welcome to ModMenus!",
      html: emailBody,
    };

    await transporter.sendMail(message);

    return true;
  } catch (error) {
    throw error;
  }
};


module.exports={
  registerEmail
}
