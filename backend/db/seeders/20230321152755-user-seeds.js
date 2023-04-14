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
          email: "drowrogue@waterdeep.com", // 1
          username: "sirUser123",
          firstName: "Sir",
          lastName: "Basic",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "sorceress@thundertree.com", // 2
          username: "stormcaller",
          firstName: "Aurora",
          lastName: "Firestorm",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "paladin@neverwinter.com", // 3
          username: "holyavenger",
          firstName: "Cedric",
          lastName: "Lightbringer",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "bard@baldursgate.com", // 4
          username: "songweaver",
          firstName: "Elaith",
          lastName: "Craulnober",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "cleric@waterdeep.com", // 5
          username: "divinehammer",
          firstName: "Lathander",
          lastName: "Morninglord",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "demoEmail@email.com", // 6
          username: "demoUser",
          firstName: "Demo",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("demoPassword"),
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