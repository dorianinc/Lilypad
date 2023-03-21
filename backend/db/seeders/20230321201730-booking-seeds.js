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
          userId: 1,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 2
          spotId: 2,
          userId: 1,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 3
          spotId: 3,
          userId: 2,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 4
          spotId: 4,
          userId: 2,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 5
          spotId: 5,
          userId: 3,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 6
          spotId: 1,
          userId: 3,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 7
          spotId: 2,
          userId: 2,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 8
          spotId: 3,
          userId: 4,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 9
          spotId: 4,
          userId: 5,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
        },
        {
          // 10
          spotId: 5,
          userId: 5,
          startDate: "2021-07-01",
          endDate: "2021-07-05",
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
