const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.SEND_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH,
    accessToken: process.env.GOOGLE_ACCESS
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
