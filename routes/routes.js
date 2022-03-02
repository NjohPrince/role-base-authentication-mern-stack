// routes
const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

const { userSignupValidator, userSigninValidator } = require("../validators/auth");
const { runValidators } = require("../validators");

router.post(
  "/signup",
  userSignupValidator,
  runValidators,
  userController.signup
);

router.post("/login", userSigninValidator, runValidators, userController.login);

router.get(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.getUser
);

router.get(
  "/user/me",
  userController.allowIfLoggedin,
  userController.getProfile
);

router.get(
  "/users",
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "profile"),
  userController.getUsers
);

router.put(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "profile"),
  userController.updateUser
);

router.delete(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "profile"),
  userController.deleteUser
);

module.exports = router;
