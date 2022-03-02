const nodemailer = require("nodemailer");
const { MAIL_SETTINGS } = require("../constants/constants");
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.email,
      subject: "ACCOUNT PASSWORD CREDENTIALS",
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>User Management System.</h2>
        <h4></h4>
        <p style="margin-bottom: 30px;">Your Password To Get Started</p>
        <h1 style="font-size: 30px; letter-spacing: 2px; text-align:center;">Email: ${params.email}</h1>
        <h1 style="font-size: 50px; letter-spacing: 2px; text-align:center;">Password: ${params.password}</h1>
        <p style="margin-top: 50px;">Please this mail was intended for ${params.name}. If you are not the one stated please delete this message.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};