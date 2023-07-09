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
          email: "john.doe@example.com",
          username: "johndoe123",
          firstName: "John",
          lastName: "Doe",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "jane.smith@example.com",
          username: "janesmith89",
          firstName: "Jane",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "alexander.wilson@example.com",
          username: "alexwilson",
          firstName: "Alexander",
          lastName: "Wilson",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "emily.johnson@example.com",
          username: "emilyj",
          firstName: "Emily",
          lastName: "Johnson",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "michael.brown@example.com",
          username: "mikebrown",
          firstName: "Michael",
          lastName: "Brown",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "lisa.johnson@example.com",
          username: "lisaj87",
          firstName: "Lisa",
          lastName: "Johnson",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "david.williams@example.com",
          username: "davidw123",
          firstName: "David",
          lastName: "Williams",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "sarah.thompson@example.com",
          username: "sthompson",
          firstName: "Sarah",
          lastName: "Thompson",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "ryan.miller@example.com",
          username: "ryanm",
          firstName: "Ryan",
          lastName: "Miller",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "demo.email@email.com",
          username: "demo_user123",
          firstName: "Demo",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("password1"),
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
