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
          reviewId: 1,
        },
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/286.png",
          reviewId: 1,
        },
        {
          url: "https://img.pokemondb.net/artwork/large/togekiss.jpg",
          reviewId: 2,
        },
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png",
          reviewId: 2,
        },
        {
          url: "https://archives.bulbagarden.net/media/upload/e/e8/0707Klefki.png",
          reviewId: 3,
        },        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
          reviewId: 3,
        },
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/286.png",
          reviewId: 4,
        },
        {
          url: "https://img.pokemondb.net/artwork/large/togekiss.jpg",
          reviewId: 4,
        },
        {
          url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png",
          reviewId: 5,
        },
        {
          url: "https://archives.bulbagarden.net/media/upload/e/e8/0707Klefki.png",
          reviewId: 5,
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
