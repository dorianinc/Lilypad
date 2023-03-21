"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {foreignKey: "spotId"})
    }
  }
  SpotImage.init(
    {
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      preview: {
        type: DataTypes.BOOLEAN,
      },
      spotId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SpotImage",
    }
  );
  return SpotImage;
};
