const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;
let connection = require("./dbconnection");
let transporter = require("./mailtransport");

const validateContactInput = require("../validation/contact");

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

app.use(express.static(publicPath));

app.post("/contact", (req, res) => {
  let data = {};
  // Someone could try to send a POST request via e.g. Postman
  // We want to try to parse data, as it should be a JSON object
  // If data isn't JSON, catch error and return errors
  try {
    data = JSON.parse(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ isJSON: false, accepted: false });
  }

  const { errors, isValid } = validateContactInput(data);

  // If input received is invalid, return errors
  if (!isValid) {
    console.log(errors);
    return res.status(400).json({ ...errors, accepted: false });
  }

  const {
    submittedName,
    submittedEmail,
    submittedComments,
    submittedSelectedOption
  } = data;

  // Data received is valid
  // Check that user has not sent too many contact requests -- Spam prevention
  connection.query(
    "SELECT * FROM submitted_emails WHERE ?",
    {
      email: submittedEmail
    },
    function(err, results) {
      // If user has already contacted 5 times, return error
      if (results && results.length > 4) {
        return res.status(400).json({
          alreadysubmitted:
            "You have submitted a contact too many times, please contact directly.",
          accepted: false
        });
      }
      // Valid new enquiry, insert into database
      connection.query(
        "INSERT INTO submitted_emails SET ?",
        {
          full_name: submittedName,
          email: submittedEmail,
          comments: submittedComments,
          reason: submittedSelectedOption
        },
        function(err, results) {
          // If there is an error inserting into database,
          // we still want to try sending email, just log err and continue
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
      // Try to send email with contact form information
      transporter.sendMail(mailOptions, function(err, data) {
        // If there is an error sending email, return error to user
        if (err) {
          console.log(err);
          return res.status(400).json({ mailnotsent: "Unable to send email" });
        }
        // Email successfully sent, return accepted
        else {
          const accepted = !!data.accepted;
          res.json({ accepted });
        }
      });
    }
  );
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
