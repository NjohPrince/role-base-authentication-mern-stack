// user controlles

const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { roles } = require("../roles/roles");

// encrypting password during account creation
async function hashPassword(password) {
  return await bcrypt.hash(password, Math.round(new Date().valueOf() * Math.random() + ''));
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

// get users controller
exports.getUsers = async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    data: users,
  });
};

// get a single user controller
exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return next(new Error("User does not exist"));

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// update user detail controller
exports.updateUser = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;

    await User.findByIdAndUpdate(userId, update);
    const user = await User.findById(userId);

    res.status(200).json({
      data: user,
      message: "User's details successfully updated.",
    });
  } catch (error) {
    next(error);
  }
};

// delete a user controller
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      data: null,
      message: "User successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// user roles configurations and verification
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);

      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;

    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
