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
    const data = await fetchedData.find({}).toArray();

    console.log(data);
  } catch (err) {
    console.error("Error: ", err);
  }
};

module.exports = mongoDB;
