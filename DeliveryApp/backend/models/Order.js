const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orderData: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("order", OrderSchema);
