require("dotenv").config();

module.exports = {
  MAIL_SETTINGS: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};
