"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  // async up(queryInterface, Sequelize) {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Bookings",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Spots",
          },
          onDelete: 'cascade'
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
          },
          onDelete: 'cascade'
        },
        startDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        endDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        numNights: {
          type: Sequelize.INTEGER,
        },
        numAdults: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        numChildren: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        numInfants: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
    options.tableName = "Bookings";
    await queryInterface.dropTable(options);
  },
};
