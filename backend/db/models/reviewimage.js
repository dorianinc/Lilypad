"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {foreignKey: "reviewId"})
    }
  }
  ReviewImage.init(
    {
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      reviewId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "ReviewImage",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return ReviewImage;
};
