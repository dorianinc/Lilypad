"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init(
    {
      address: {
        // must be alphabetic
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      city: {
        // must be alphabetic
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      state: {
        // must be alphabetic
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      country: {
        // must be alphabetic
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
      lat: {
        // must be number, length of at least 4
        type: DataTypes.DECIMAL,
        validate: {
          len: [4, 10],
        },
      },
      lng: {
        // must be number, length of at least 4
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
