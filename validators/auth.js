const { body } = require("express-validator");

exports.userSignupValidator = [
  body("name").not().isEmpty().withMessage("Your name is required."),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be more than 2 characters long."),
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

exports.userSigninValidator = [
  body("email").isEmail().withMessage("Email address invalid."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Account passwords are usually 8+ characters long."),
];
