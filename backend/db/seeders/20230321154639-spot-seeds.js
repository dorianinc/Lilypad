"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          address: "123 Fake St", // 1
          city: "Big Bear Lake",
          state: "CA",
          country: "United States",
          lat: null,
          lng: null,
          name: "Scenic Lake House",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet luctus venenatis lectus magna fringilla. Erat nam at lectus urna duis convallis. Morbi tristique senectus et netus et malesuada fames ac turpis. Neque convallis a cras semper. Habitant morbi tristique senectus et netus et.",
          price: 199.0,
          ownerId: 1,
        },
        {
          address: "123 NotReal Rd", // 2
          city: "Chino Hills",
          state: "CA",
          country: "United States",
          lat: null,
          lng: null,
          name: "Quiet and Private Retreat",
          description:
            "Nisi vitae suscipit tellus mauris. Dapibus ultrices in iaculis nunc sed augue lacus. Leo in vitae turpis massa sed elementum. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Ac feugiat sed lectus vestibulum. Cursus turpis massa tincidunt dui ut ornare lectus sit.",
          price: 194.0,
          ownerId: 1,
        },
        {
          address: "123 Phoney Rd", // 3
          city: "Long Beach",
          state: "CA",
          country: "United States",
          lat: null,
          lng: null,
          name: "Beautiful home with Marina Views",
          description:
            "Nisl tincidunt eget nullam non nisi. Condimentum lacinia quis vel eros donec ac odio tempor orci. Luctus accumsan tortor posuere ac. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Euismod nisi porta lorem mollis aliquam ut porttitor. Posuere lorem ipsum dolor sit.",
          price: 229.0,
          ownerId: 2,
        },
        {
          address: "123 Imposter Ct", // 4
          city: "Monterey",
          state: "CA",
          country: "United States",
          lat: null,
          lng: null,
          name: "The Perfect Beach House",
          description:
            "Nunc vel risus commodo viverra maecenas accumsan. Sagittis id consectetur purus ut faucibus. Eu lobortis elementum nibh tellus molestie nunc non. Pharetra pharetra massa massa ultricies mi quis hendrerit. Eget duis at tellus at. Enim ut tellus elementum sagittis vitae et.",
          price: 166.0,
          ownerId: 2,
        },
        {
          address: "123 Sham Dr", // 5
          city: "Half Moon Bay",
          state: "CA",
          country: "United States",
          lat: null,
          lng: null,
          name: "A Little Piece of Heaven",
          description:
            "Turpis cursus in hac habitasse platea dictumst quisque sagittis. Amet massa vitae tortor condimentum lacinia. In iaculis nunc sed augue lacus. Diam maecenas sed enim ut sem viverra aliquet eget sit. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Elit pellentesque habitant morbi tristique senectus et netus et.",
          price: 150.0,
          ownerId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};