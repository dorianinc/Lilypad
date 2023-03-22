"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
    }
  }
  Review.init(
    {
      review: {
        allowNull: false,
        type: DataTypes.STRING,
        len: [25, 200],
      },
      stars: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
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
      modelName: "Review",
    }
  );
  return Review;
};
