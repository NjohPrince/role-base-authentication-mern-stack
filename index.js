require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/UserModel");
const routes = require("./routes/routes");

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
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
} else {
  app.use(cors({ origin: `${process.env.HOSTED_URL}` }));
}

const publicPath = path.join(__dirname, "build");
app.use(express.static(publicPath));
app.use("/static", express.static(path.join(__dirname, "build/static")));
app.use(
  "/manifest.json",
  express.static(path.join(__dirname, "build", "manifest.json"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    // check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired. Login required to get a new one",
      });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
});

app.use("/api/v1", routes);

app.post("/api/v1/store-token", (req, res) => {
  const { token } = req.body;
  if (token && token !== "") {
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  } else {
    res.status(404).json({ error: "No token obtained" });
  }
});

app.get("/api/v1/get-jwt", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    res
      .status(403)
      .json({ error: "Unauthorized" });
  }
  res.status(200).json({ token: token });
});

app.get("/api/v1/logout", (req, res) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ message: "Successfully logged out, Please come back soon." });
});

const PORT = process.env.PORT || 3001;

startServer();
