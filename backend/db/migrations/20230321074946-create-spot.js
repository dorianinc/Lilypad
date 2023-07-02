"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  // async up(queryInterface, Sequelize) {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
          },
          onDelete: "cascade",
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING(45),
        },
        city: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        country: {
          allowNull: false,
          type: Sequelize.STRING(30),
        },
        lat: {
          type: Sequelize.DECIMAL,
        },
        lng: {
          type: Sequelize.DECIMAL,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING(400),
        },
        minNights: {
          type: Sequelize.INTEGER,
          defaultValue: 2,
        },
        maxGuests: {
          type: Sequelize.INTEGER,
          defaultValue: 8,
        },
        price: {
          allowNull: false,
          type: Sequelize.DECIMAL,
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
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  },
};
