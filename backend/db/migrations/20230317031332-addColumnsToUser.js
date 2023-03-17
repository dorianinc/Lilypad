"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn("Users", "firstName", {
    //   firstName: {
    //     allowNull: false,
    //     type: Sequelize.STRING(30),
    //   },
    // });
    // await queryInterface.addColumn("Users", "lastName", {
    //   firstName: {
    //     allowNull: false,
    //     type: Sequelize.STRING(30),
    //   },
    // });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn("Users", "firstName");
    // await queryInterface.removeColumn("Users", "lastName");
  },
};
