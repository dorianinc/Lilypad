"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
      // Spot.belongsToMany(models.User, {
      //   through: models.Review,
      //   otherKey: "userId",
      //   foreignKey: "spotId",
      // });
      // Spot.belongsToMany(models.User, {
      //   through: models.Booking,
      //   as: "owner",
      //   otherKey: "ownerId",
      //   foreignKey: "spotId",
      // });
    }
  }
  Spot.init(
    {
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [5, 58],
        },
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [2, 20],
        },
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [4, 35],
        },
      },
      lat: {
        type: DataTypes.DECIMAL,
      },
      lng: {
        type: DataTypes.DECIMAL,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [5, 25],
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          max: 400,
        },
      },
      minNights: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      maxGuests: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
      raw: true,
    }
  );
  return Spot;
};
