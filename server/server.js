const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
const mysql = require("mysql");

const validateContactInput = require("../validation/contact");

require("dotenv").config({ path: ".env.development" });

app.use(function(req, res, next) {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });

  req.on("end", function() {
    req.body = data;
    next();
  });
});

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "portfolio"
});

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

app.use(express.static(publicPath));

app.post("/contact", (req, res) => {
  let data = {};
  try {
    data = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).json({ isJSON: false });
  }

  const { errors, isValid } = validateContactInput(data);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    submittedName,
    submittedEmail,
    submittedComments,
    submittedSelectedOption
  } = data;

  connection.query(
    "SELECT * FROM submitted_emails WHERE ?",
    {
      email: submittedEmail
    },
    function(err, results) {
      if (results.length > 4) {
        return res.status(400).json({
          alreadysubmitted:
            "You have submitted a contact too many times, please contact directly.",
          accepted: false
        });
      }
    }
  );

  connection.query(
    "INSERT INTO submitted_emails SET ?",
    {
      full_name: submittedName,
      email: submittedEmail,
      comments: submittedComments,
      reason: submittedSelectedOption
    },
    function(err, results) {
      if (err) {
        console.log(err);
      }
    }
  );

  const mailOptions = {
    from: submittedEmail,
    to: process.env.SEND_EMAIL,
    subject: `Portfolio Inquiry From ${submittedName}`,
    html: `<p><strong>Contact Name:</strong> ${submittedName}</p><p><strong>Contact E-mail:</strong> ${submittedEmail}</p><p><strong>Reason For Contact:</strong> ${submittedSelectedOption}</p><p><strong>Comments:</strong> ${submittedComments}</p>`
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const accepted = !!data.accepted;
      res.json({ accepted });
    }
  });
});

app.get("/questions", (req, res) => {
  connection.query(
    "SELECT question, answer, search_terms FROM intro_questions",
    function(error, results, fields) {
      if (error) {
        throw error;
      }
      res.json(results);
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
