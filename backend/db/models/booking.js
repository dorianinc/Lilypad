"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Spot, {
        // otherKey: "userId",
        foreignKey: "spotId",
      });
      Booking.belongsTo(models.User, {
        // otherKey: "spotId",
        foreignKey: "userId",
      });
    }
  }
  Booking.init(
    {
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
