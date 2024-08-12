"use strict";
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const spotSeeds = () => {
  const spots = [];
  const cities = ["Los Angeles", "San Francisco", "San Diego", "Santa Monica", "Santa Barbara"];
  const states = ["California"];
  const countries = ["United States"];
  
  for (let i = 0; i < 20; i++) {
    spots.push({
      name: faker.lorem.words(3), // Generate a random name
      address: faker.address.streetAddress(),
      city: cities[faker.datatype.number({ min: 0, max: cities.length - 1 })],
      state: states[0],
      country: countries[0],
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      description: faker.lorem.paragraph(), // Generate a random description
      price: faker.datatype.number({ min: 200, max: 600 }), // Random price between 200 and 600
      minNights: faker.datatype.number({ min: 1, max: 5 }), // Random minimum nights
      maxGuests: faker.datatype.number({ min: 2, max: 12 }), // Random maximum guests
      ownerId: Math.floor(Math.random() * 10) + 1 // Keep ownerId static as an integer between 1 and 10
    });
  }

  return spots;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, spotSeeds(), {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
  spotSeeds,
};
