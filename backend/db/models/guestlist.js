"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GuestList extends Model {
    static associate(models) {
      GuestList.belongsTo(models.Booking, {foreignKey: "bookingId"})
    }
  }
  GuestList.init(
    {
      numAdults: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      numChildren: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      numInfants: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      bookingId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "GuestList",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return GuestList;
};
