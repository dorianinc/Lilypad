"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  // async up(queryInterface, Sequelize) {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Reviews",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        review: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        stars: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        spotId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: "Spots",
            },
          },
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: "Users",
            },
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  // async down(queryInterface, Sequelize) {
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    await queryInterface.dropTable(options);
  },
};
