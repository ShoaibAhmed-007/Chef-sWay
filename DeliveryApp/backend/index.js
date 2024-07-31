const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoDB = require("./db.js");

mongoDB();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.listen(port, () => {
  console.log("Listening to Port 300");
});

app.use("/api", require("./Routes/Signup.js"));

app.use("/api", require("./Routes/Login.js"));

app.use("/api", require("./Routes/displayData.js"));

app.use("/api", require("./Routes/Order.js"));
