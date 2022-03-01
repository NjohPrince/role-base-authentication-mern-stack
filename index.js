require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send({ message: " Based Authentication System - MERN Stack" }).status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
