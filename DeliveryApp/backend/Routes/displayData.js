const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/displayData", async (req, res) => {
  try {
    res
      .status(200)
      .send({ foodItems: global.foodItems, foodCategory: global.foodCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Fetching Data" });
  }
});

module.exports = router;
