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

const sendMail = (
  { submittedEmail, submittedName, submittedComments, submittedSelectedOption },
  callback
) => {
  const mailOptions = {
    from: submittedEmail,
    to: process.env.SEND_EMAIL,
    subject: `Portfolio Inquiry From ${submittedName}`,
    html: `<p><strong>Contact Name:</strong> ${submittedName}</p><p><strong>Contact E-mail:</strong> ${submittedEmail}</p><p><strong>Reason For Contact:</strong> ${submittedSelectedOption}</p><p><strong>Comments:</strong> ${submittedComments}</p>`
  };

  // Try to send email with contact form information
  transporter.sendMail(mailOptions, callback);
};

module.exports = { transporter, sendMail };
