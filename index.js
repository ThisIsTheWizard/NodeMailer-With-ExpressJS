"use strict";
const express = require("express");

const app = express();

// Requiring NodeMailer
const nodemailer = require("nodemailer");

// Creating Connetion With Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // Put Your Gmail ID And Password & Make Sure Your Gooogle ID Has Less Secure App Service IS On
    user: "email@gmail.com",
    pass: "Password",
  },
});

app.get("/", (req, res) => {
  // Mail Data To Be Sent
  const mailOptions = {
    from: "'Name'<email@gmail.com>",
    to: "email@email.com",
    subject: "Test Mail",
    html:
      `<h1>Hello</h1>
       <p>This mail has been sent to you from nodejs application</p>`,
  };

  // Mail Sending Function
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      res.send("Email sent: " + JSON.stringify(info));
    }
  });
});

// Verifying Connection With Gmail
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Node App Runner
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
