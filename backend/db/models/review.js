"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
      Review.belongsTo(models.Spot, {
        // otherKey: "userId",
        foreignKey: "spotId",
      });
      Review.belongsTo(models.User, {
        // otherKey: "spotId",
        foreignKey: "userId",
      });
    }
  }
  Review.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
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
    },
    {
      sequelize,
      modelName: "Review",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Review;
};
