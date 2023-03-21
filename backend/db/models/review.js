"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
