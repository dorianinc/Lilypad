"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "potato1@gmail.com", // 1
          username: "user123",
          firstName: "Random",
          lastName: "Name",
          hashedPassword: bcrypt.hashSync("password123"),
        },
        {
          email: "potato2@gmail.com", // 2
          username: "hCross123",
          firstName: "Hannah",
          lastName: "Cross",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "potato3@gmail.com", // 3
          username: "oTurn123",
          firstName: "Olive",
          lastName: "Turner",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "potato4@gmail.com", // 4
          username: "tFord123",
          firstName: "Terrance",
          lastName: "Ford",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "potato5@gmail.com", // 5
          username: "kWolf123",
          firstName: "Kristine",
          lastName: "Wolfe",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkDelete(options, null, {});
  },
};
