"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
          spotId: 3,
        },
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/286.png",
          spotId: 4,
        },
        {
          url: "https://img.pokemondb.net/artwork/large/togekiss.jpg",
          spotId: 4,
        },
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png",
          spotId: 5,
        },
        {
          url: "https://archives.bulbagarden.net/media/upload/e/e8/0707Klefki.png",
          spotId: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
