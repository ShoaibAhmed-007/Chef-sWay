const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    let password = req.body.password;
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (user.password === password) {
        res
          .status(201)
          .json({ success: true, message: "User logged in successfully" });
      } else {
        res.status(400).json({ success: false, message: "Incorrect Password" });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ success: false, message: "Incorrect Email" });
    }
  }
);

module.exports = router;
