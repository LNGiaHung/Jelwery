const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

// In-memory store for tokens (in production, use a database or Redis)
const tokenStore = new Map();

const signInPage = {
  signInPage: 'http://127.0.0.1:5502/Bản%20sao%20Bijou/singIn/signIn.html'
};

// Mail configuration
const mailConfig = {
  HOST: 'smtp.gmail.com',
  PORT: 587, // typically the port for SMTP
  USERNAME: '21521099@gm.uit.edu.vn',
  PASSWORD: 'vmtv cdoi calt bkci',
  FROM_ADDRESS: '21521099@gm.uit.edu.vn'
};

// Function to send email
const sendMail = async (to, subject, htmlContent) => {
  const transport = nodemailer.createTransport({
      host: mailConfig.HOST,
      port: mailConfig.PORT,
      secure: false,
      auth: {
          user: mailConfig.USERNAME,
          pass: mailConfig.PASSWORD,
      }
  });

  const options = {
      from: mailConfig.FROM_ADDRESS,
      to: to,
      subject: subject,
      html: htmlContent
  };

  try {
      const info = await transport.sendMail(options);
      console.log('Email sent: ' + info.response);
      return info;
  } catch (error) {
      console.error('Error sending email:', error);
      throw error;
  }
};
// http://localhost:3001/auth/verify/${user.Mail}/${hashedEmail}
// http://127.0.0.1:5502/Bản%20sao%20Bijou/singIn/signIn.html
router.post("/", async (req, res) => {
  try {
    const { FirstName, LastName, Mail, DOB, Password, Gender, RelationshipStatus } = req.body;

    // Check if the password is empty
    if (!Password || Password.trim() === "") {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    console.log("create const user");
    const user = new Users({
      FirstName,
      LastName,
      Mail,
      DOB,
      Password: hashedPassword,
      Gender,
      RelationshipStatus,
    });
    console.log("user1:",user);
    console.log("send mailer");
    bcrypt.hash(user.Mail, parseInt(10)).then((hashedEmail) => {
      console.log(`http://127.0.0.1:5502/Bản%20sao%20Bijou/singIn/signIn.html/verify?email=${user.Mail}&token=${hashedEmail}`);
      sendMail(user.Mail, "Verify Email", `<a href="http://localhost:3001/auth/verify/${user.Mail}/${hashedEmail}/${signInPage.signInPage}"> Verify </a>`)
    });
    // sendMail()
    console.log("create user");
    // user = await Users.create({
    //   FirstName,
    //   LastName,
    //   Mail,
    //   DOB,
    //   Password: hashedPassword,
    //   Gender,
    //   RelationshipStatus,
    // });
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// router.post("/verify/:email/:token", async (req, res) =>{
//   try {
//     const email = req.params.email;
//     const token = req.params.token;
//     // const { email, token } = req.body; // Assuming email and token are sent in the request body

//     // Compare the provided email and token with hashed values
//     bcrypt.compare(email, token, async (err, result) => {
//       if (result) {
//         // If the email and token match, verify the user
//         await Users.verify(email);
//         console.log("Email verified successfully");
//         res.status(200).json({ message: "Email verified successfully" });
//       } else {
//         // If email and token don't match, return error
//         res.status(400).json({ message: "Invalid email or token" });
//       }
//     });
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     res.status(500).json({ message: "Error verifying email" });
//   }
// })

router.post("/verify/:email/:token/:signInPage", async (req, res) =>{
  try {
    const page = req.params.signInPage;
    const email = req.params.email;
    const token = req.params.token;

    // Make a request to the verification endpoint using fetch
    const response = await fetch(`http://localhost:3001/auth/verify/${email}/${token}`);
    const data = await response.json();

    if (response.ok) {
      console.log("Email verified successfully");
      res.status(200).json(data);
      window.location.href = `${page}`;
    } else {
      console.error("Error verifying email:", data.message);
      res.status(400).json({ message: "Error verifying email" });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Error verifying email" });
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { Mail: email } });
  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.Password).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username And Password Combination" });
      } else {
        res.json({ message: "YOU LOGGED IN!!!", user: user });
      }
    });
  }
});

router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  
  try {
      const user = await Users.findOne({ where: { Mail: email } });
      
      if (user) {
          return res.status(200).json({ exists: true });
      } else {
          return res.status(200).json({ exists: false });
      }
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;