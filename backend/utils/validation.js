
const { validationResult } = require('express-validator');
const { check } = require("express-validator");

// main function that makes validation handling work
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
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
    .withMessage("Please provide an address"),
  check("city")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Please provide a city name")
    .isLength({ min: 5, max: 58 })
    .withMessage("City name must be between 5 to 58 characters long"),
  check("state")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Please provide a state")
    .isLength({ min: 2, max: 2 })
    .withMessage("State must be abbreviated"),
  check("country")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Please provide a Country")
    .isLength({ min: 5, max: 58 })
    .withMessage("Country name must be between 4 to 15 characters long"),
  check("name")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Please provide a name")
    .isLength({ min: 5, max: 25 })
    .withMessage("Name must be between 5 to 25 characters long"),
  check("price")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Please provide price for spot"),
  handleValidationErrors,
];

// const validateSpotImage = [

// ]
 

module.exports = {
  validateSignup,
  validateLogin,
  validateSpotPost
};