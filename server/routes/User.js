const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { FirstName,LastName, Mail,DOB , Password,Gender,RelationshipStatus } = req.body;
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

// router.put("/:userId/:status", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { status } = req.params;

//     // Find the user by ID
//     const user = await Users.findOne({ _id: userId });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user's status
//     user.Status = status;
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     console.error("Error updating user status:", error);
//     res.status(500).json({ message: "Error updating user status" });
//   }
// });

module.exports = router;