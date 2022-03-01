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

// login controller
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // verifying if a user exists with given email
    const user = await User.findOne({ email });
    if (!user) return next(new Error(`No user with email ${email} found!`));

    // verifying the password provided is the same as the encrypted password saved in the database
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error("Incorrect Password!"));

    // generating a new access token for the user
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // update the token upon new login
    await User.findByIdAndUpdate(user._id, { accessToken });

    res.status(200).json({
      data: { fullname: user.fullname, email: user.email, role: user.role },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
