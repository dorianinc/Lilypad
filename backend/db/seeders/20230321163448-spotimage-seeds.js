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
          url: "https://a0.muscache.com/im/pictures/851014f8-8eab-4200-af19-f4baaacf6ef0.jpg",
          preview: true,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-578446612282152732/original/5847d03e-561f-4df1-9c0a-b46e2dc6c132.jpeg",
          preview: true,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-783596357867447904/original/5054d541-bcd3-429a-940c-745e9a171a15.jpeg",
          preview: true,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-783596357867447904/original/14da4321-d870-4aee-9c8d-c23737514769.jpeg",
          preview: true,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-793110064112990749/original/f272d10a-9945-4dd6-9c99-6ed9b40c0de4.jpeg",
          preview: true,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-793110064112990749/original/c9e1c454-a2b9-4d30-ae98-affc3ea168c9.jpeg",
          preview: true,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/221391b7-64b5-4c70-b1ef-554db51e1194.jpg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/056c72c8-5727-4e62-a607-90c35ad8dd50.jpg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/616bc395-644d-4089-b2c1-13c6c11c50fd.jpg",
          preview: true,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/ef69e6d5-a1e3-4295-91b0-9d60aa1caa89.jpg",
          preview: true,
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
