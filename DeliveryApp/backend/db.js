const mongoose = require("mongoose");
const connectURL = `mongodb+srv://xshoaibahmedx007:shoaib007@chefsway.rlexrf2.mongodb.net/Chef'sWay?retryWrites=true&w=majority&appName=ChefsWay`;

const mongoDB = async () => {
  try {
    await mongoose.connect(connectURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");

    const fetchedData = mongoose.connection.db.collection("foodData");
    const categoryData = mongoose.connection.db.collection("foodCategory");
    const data = await fetchedData.find({}).toArray();
    const foodCategory = await categoryData.find({}).toArray();
    global.foodItems = data;
    global.foodCategory = foodCategory;
    console.log(global.foodCategory);
  } catch (err) {
    console.error("Error: ", err);
  }
};

module.exports = mongoDB;
