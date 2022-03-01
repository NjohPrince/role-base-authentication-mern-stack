require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// setting up the database connection and server
const startServer = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to MongoDB!");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

app.get("/", (req, res) => {
  res
    .send({ message: " Based Authentication System - MERN Stack" })
    .status(200);
});

const PORT = process.env.PORT || 5000;

startServer();
