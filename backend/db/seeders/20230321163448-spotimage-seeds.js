"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "preview value is true",
          preview: true,
          spotId: 1,
        },
        {
          url: "preview value is false",
          preview: false,
          spotId: 1,
        },
        {
          url: "preview value is true",
          preview: true,
          spotId: 2,
        },
        {
          url: "preview value is false",
          preview: false,
          spotId: 2,
        },
        {
          url: "preview value is true",
          preview: true,
          spotId: 3,
        },
        {
          url: "preview value is false",
          preview: false,
          spotId: 3,
        },
        {
          url: "preview value is true",
          preview: true,
          spotId: 4,
        },
        {
          url: "preview value is false",
          preview: false,
          spotId: 4,
        },
        {
          url: "preview value is true",
          preview: true,
          spotId: 5,
        },
        {
          url: "preview value is false",
          preview: false,
          spotId: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
