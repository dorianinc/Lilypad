"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          // 1
          spotId: 1,
          userId: 4,
          startDate: "2021-07-15T00:00:00",
          endDate: "2021-07-20T00:00:00",
        },
        {
          // 2
          spotId: 2,
          userId: 1,
          startDate: "2021-11-10T00:00:00", // nov 10th 2021
          endDate: "2021-11-15T00:00:00" // Nov 15th 2021
        },
        {
          // 3
          spotId: 3,
          userId: 2,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
        {
          // 4
          spotId: 4,
          userId: 2,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
        {
          // 5
          spotId: 5,
          userId: 3,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
        {
          // 6
          spotId: 1,
          userId: 3,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
        {
          // 7
          spotId: 2,
          userId: 2,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
        {
          // 8
          spotId: 3,
          userId: 4,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05",
        },
        {
          // 9
          spotId: 4,
          userId: 5,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
        {
          // 10
          spotId: 5,
          userId: 1,
          startDate: "2021-07-01T00:00:00",
          endDate: "2021-07-05T00:00:00",
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
