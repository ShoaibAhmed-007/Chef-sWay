const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orders", async (req, res) => {
  const data = {
    orderData: req.body.orderData,
    orderDate: new Date().toISOString().slice(0, 10).replace(/-/g, "/"),
  };

  try {
    let eID = await Order.findOne({ email: req.body.email });
    console.log("eID:", eID);

    if (eID == null) {
      // If no order exists for this email, create a new order
      let myOrder = new Order({
        email: req.body.email,
        orderData: [data],
      });
      await myOrder.save();
      console.log("myOrder created");
      res
        .status(201)
        .json({ success: true, message: "Order created successfully" });
    } else {
      // If an order exists, update the existing order
      const updateResult = await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orderData: data } },
        { new: true } // This option returns the updated document
      );
      console.log("updateResult:", updateResult);
      res
        .status(201)
        .json({ success: true, message: "Order updated successfully" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/getOrders", async (req, res) => {
  try {
    let orders = await Order.find({ email: req.body.email });
    console.log("Orders", orders);
    if (orders.length > 0) {
      res.status(201).json({
        orderData: orders[0].orderData,
        success: true,
        message: "Order fetched successfully",
      });
    } else {
      res.status(201).json({
        orderData: [],
        success: true,
        message: "No orders found",
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
