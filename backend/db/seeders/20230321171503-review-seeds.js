"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          stars: 5,
          spotId: 1,
          userId: 1
        },
        {
          review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          stars: 4,
          spotId: 2,
          userId: 1
        },
        {
          review: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          stars: 4,
          spotId: 3,
          userId: 2
        },
        {
          review: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          stars: 4,
          spotId: 4,
          userId: 2
        },
        {
          review: "Mollis nunc sed id semper risus in hendrerit gravida rutrum. In nisl nisi scelerisque eu ultrices vitae auctor eu.",
          stars: 5,
          spotId: 5,
          userId: 3
        },
        {
          review: "Ante metus dictum at tempor commodo ullamcorper a. Lacus luctus accumsan tortor posuere ac ut consequat semper. Aliquam etiam erat velit scelerisque.",
          stars: 3,
          spotId: 1,
          userId: 3
        },
        {
          review: "Massa placerat duis ultricies lacus sed turpis tincidunt. Viverra accumsan in nisl nisi scelerisque. Libero enim sed faucibus turpis in eu mi bibendum neque.",
          stars: 2,
          spotId: 2,
          userId: 4
        },
        {
          review: "Sit amet consectetur adipiscing elit pellentesque habitant.",
          stars: 4,
          spotId: 3,
          userId: 4
        },
        {
          review: "Velit euismod in pellentesque massa placerat duis ultricies lacus sed.",
          stars: 1,
          spotId: 4,
          userId: 5
        },
        {
          review: "Pharetra diam sit amet nisl suscipit adipiscing bibendum est.",
          stars: 3,
          spotId: 5,
          userId: 5
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews"
    return queryInterface.bulkDelete(options, null, {})
  }
};
