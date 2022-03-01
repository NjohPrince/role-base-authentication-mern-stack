// user controlles

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// encrypting password during account creation
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// compare password for match during login
async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// signup controller
exports.signup = async (req, res, next) => {
  try {
    // extracting necessary data from the request's body
    const { fullname, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);

    // creating an instance of the new user using the mongoose schema
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role: role || "USER_ADMIN",
    });

    // generating access token for user
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // assigning token to the new user
    newUser.accessToken = accessToken;
    await newUser.save();
    res
      .json({
        data: newUser,
        accessToken,
      })
      .status(201);
  } catch (error) {
    next(error);
  }
};
