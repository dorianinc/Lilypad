const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const lngRegex = /^-?((([0-9]|[1-9][0-9]|1[0-7][0-9])(\.\d+)?)|180(\.0+)?)/;
const latRegex = /^-?(([0-8][0-9](\.\d+)?)|90(\.0+)?)/;

// main function that makes validation handling work
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    // err.title = "Bad Request";
    next(err);
  }
  next();
};
// validator for when new user is signing up
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// validator for when a user is trying to long in
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// validator for when trying to create new spot
const validateSpotPost = [
  check("address")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Country is required"),
  check("lat")
    .custom((value) => value === null || value === "" || value.match(latRegex))
    .withMessage("Latitude is not valid"),
  check("lng")
    .custom((value) => value === null || value === "" || value.match(lngRegex))
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Name is required")
    .isLength({ max: 25 })
    .withMessage("Name must be less than 50 characters"),
  check("price")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// const validateSpotImage = [

// ]

module.exports = {
  validateSignup,
  validateLogin,
  validateSpotPost,
};
