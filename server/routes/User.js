const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sequelize } = require('../models');
const { Op } = require('sequelize');

// In-memory store for tokens and users (in production, use a database or Redis)
const tokenStore = new Map();
const userStore = new Map();

const signInPage = {
  signInPage: 'http://127.0.0.1:5502/Bản%20sao%20Bijou/singIn/signIn.html'
};

// Mail configuration
const mailConfig = {
  HOST: 'smtp.gmail.com',
  PORT: 587,
  USERNAME: '21521099@gm.uit.edu.vn',
  PASSWORD: 'isdv jbhy yagw heuh',
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

router.post("/mailer/:to/:subject/:htmlContent", async (req, res) => {
  const { to, subject, htmlContent } = req.params;

  if (!to || !subject || !htmlContent) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
      const info = await sendMail(to, subject, htmlContent);
      res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { FirstName, LastName, Mail, DOB, Password, Gender, RelationshipStatus } = req.body;

    if (!Password || Password.trim() === "") {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Retrieve the highest CID from the database
    const lastUser = await Users.findOne({
      attributes: [[sequelize.fn('MAX', sequelize.col('CID')), 'maxCID']],
      where: {
        CID: {
          [Op.like]: 'customer%',
        },
      },
      raw: true,
    });

    let newCID = 'customer1'; // Default CID if no users exist

    if (lastUser && lastUser.maxCID) {
      const lastCIDNumber = parseInt(lastUser.maxCID.replace('customer', '')) || 0;
      newCID = `customer${lastCIDNumber + 1}`;
    }

    const user = {
      CID: newCID, // Assign the new CID
      FirstName,
      LastName,
      Mail,
      Phone: '0987654321',
      DOB,
      Password: hashedPassword,
      Gender,
      RelationshipStatus,
      verificationCode
    };

    userStore.set(Mail, user);
    tokenStore.set(Mail, verificationCode);

    await sendMail(Mail, "Verify Email", `Your verification code is: ${verificationCode}`);

    res.status(200).json({ message: 'Verification email sent. Please check your email.' });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/verify", async (req, res) => {
  const { email, code } = req.body;

  if (tokenStore.has(email)) {
    const storedCode = tokenStore.get(email);

    if (storedCode === code) {
      const user = userStore.get(email);

      // Update the user in the database
      await Users.create({
        CID: user.CID, // Include CID here
        FirstName: user.FirstName,
        LastName: user.LastName,
        Mail: user.Mail,
        DOB: user.DOB,
        Password: user.Password,
        Gender: user.Gender,
        RelationshipStatus: user.RelationshipStatus,
        Verify: true
      });

      tokenStore.delete(email);
      userStore.delete(email);

      res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } else {
      res.status(400).json({ message: "Invalid verification code." });
    }
  } else {
    res.status(400).json({ message: "Invalid or expired verification request." });
  }
});


router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { Mail: email } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    const match = await bcrypt.compare(password, user.Password);

    if (!match) {
      res.status(400).json({ error: "Wrong Username And Password Combination" });
    } else {
      res.json({ message: "YOU LOGGED IN!!!", user: user });
    }
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
