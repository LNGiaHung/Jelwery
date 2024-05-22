const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { FirstName, LastName, Mail, DOB, Password, Gender, RelationshipStatus } = req.body;

    // Check if the password is empty
    if (!Password || Password.trim() === "") {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await Users.create({
      FirstName,
      LastName,
      Mail,
      DOB,
      Password: hashedPassword,
      Gender,
      RelationshipStatus,
    });

    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
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