"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Spots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: { // must be alphabetic
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: { // must be alphabetic
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      country: { // must be alphabetic
        allowNull: false,
        type: Sequelize.STRING,
      },
      lat: { // must be number, length of at least 4
        type: Sequelize.DECIMAL,
      }, // index lat and lng with unique
      lng: { // must be number, length of at least 4
        type: Sequelize.DECIMAL,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: { // minimum is 0
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Spots");
  },
};
