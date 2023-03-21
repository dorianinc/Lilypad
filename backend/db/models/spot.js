"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
      Spot.belongsToMany(models.User, { through: models.Booking });
      Spot.belongsToMany(models.User, { through: models.Review });
    }
  }
  Spot.init(
    {
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          len: [2,2]
        },
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      lat: {
        type: DataTypes.DECIMAL,
        validate: {
          len: [4, 10],
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        validate: {
          len: [4, 10],
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          max: 400,
        },
      },
      price: {
        // minimum is 0
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
