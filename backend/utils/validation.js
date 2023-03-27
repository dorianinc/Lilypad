const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const lngRegex = /^-?((([0-9]|[1-9][0-9]|1[0-7][0-9])(\.\d+)?)|180(\.0+)?)/;
const latRegex = /^-?(([0-8][0-9](\.\d+)?)|90(\.0+)?)/;

// main function that makes validation handling work
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    next(err);
  }
  next();
};
// validator for when new user is signing up
const validateSignup = [
  check("firstName").exists({ checkFalsy: true }).withMessage("First Name is required"),
  check("lastName").exists({ checkFalsy: true }).withMessage("Last Name is required"),
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
  check("password").exists({ checkFalsy: true }).withMessage("Please provide a password."),
  handleValidationErrors,
];

// validator for when trying to create new spot
const validateSpot = [
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
    .custom((value) => value === null || value.toString().match(latRegex))
    .withMessage("Latitude is not valid"),
  check("lng")
    .custom((value) => value === null || value.toString().match(lngRegex))
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Name is required")
    .isLength({ max: 25 })
    .withMessage("Name must be less than 50 characters"),
    check("description")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Review text is required"),
  check("stars")
    .custom((value) => value >= 1 && value <= 5)
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
const validateBooking = [
  check("endDate")
    .custom((value, { req }) => new Date(req.body.startDate) < new Date(value))
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

validateQueries = [
  check("page")
    .custom((value) => value === undefined || value >= 1)
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .custom((value) => value === undefined || value >= 1)
    .withMessage("Size must be greater than or equal to 1"),
  check("minLat")
    .custom((value) => value === undefined || value >= -90)
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .custom((value) => value === undefined || value <= 90)
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .custom((value) => value === undefined || value >= -180)
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .custom((value) => value === undefined || value <= 180)
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .custom((value) => value === undefined || value >= 0)
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .custom((value) => value === undefined || value >= 0)
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
  validateSpot,
  validateReview,
  validateBooking,
  validateQueries,
};
