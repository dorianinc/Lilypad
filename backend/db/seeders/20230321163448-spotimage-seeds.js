"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511307/Airdnd/05-spot/spot5-01.png",
          preview: true,
          spotId: 1,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511307/Airdnd/05-spot/spot5-02.png",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511306/Airdnd/05-spot/spot5-03.png",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511318/Airdnd/05-spot/spot5-04.png",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511318/Airdnd/05-spot/spot5-05.png",
          preview: false,
          spotId: 1,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511280/Airdnd/01-spot/spot1-05.png",
          preview: false,
          spotId: 5,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511302/Airdnd/02-spot/spot2-01.png",
          preview: true,
          spotId: 2,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511302/Airdnd/02-spot/spot2-02.png",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511302/Airdnd/02-spot/spot2-03.png",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511302/Airdnd/02-spot/spot2-04.png",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511302/Airdnd/02-spot/spot2-05.png",
          preview: false,
          spotId: 2,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511304/Airdnd/03-spot/spot3-01.png",
          preview: true,
          spotId: 3,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511304/Airdnd/03-spot/spot3-02.png",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511304/Airdnd/03-spot/spot3-03.png",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511304/Airdnd/03-spot/spot3-04.png",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511302/Airdnd/03-spot/spot3-05.png",
          preview: false,
          spotId: 3,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511305/Airdnd/04-spot/spot4-01.png",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511305/Airdnd/04-spot/spot4-02.png",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511306/Airdnd/04-spot/spot4-03.png",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511304/Airdnd/04-spot/spot4-04.png",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511306/Airdnd/04-spot/spot4-05.png",
          preview: false,
          spotId: 4,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511280/Airdnd/01-spot/spot1-01.png",
          preview: true,
          spotId: 5,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511280/Airdnd/01-spot/spot1-02.png",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511281/Airdnd/01-spot/spot1-03.png",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511281/Airdnd/01-spot/spot1-04.png",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681513280/Airdnd/06-spot/spot6-01.png",
          preview: true,
          spotId: 6,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511318/Airdnd/06-spot/spot6-02.png",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511308/Airdnd/06-spot/spot6-03.png",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511318/Airdnd/06-spot/spot6-04.png",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511307/Airdnd/06-spot/spot6-05.png",
          preview: false,
          spotId: 6,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511308/Airdnd/07-spot/spot7-01.png",
          preview: true,
          spotId: 7,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511309/Airdnd/07-spot/spot7-02.png",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511309/Airdnd/07-spot/spot7-03.png",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511320/Airdnd/07-spot/spot7-04.png",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511318/Airdnd/07-spot/spot7-05.png",
          preview: false,
          spotId: 7,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511311/Airdnd/08-spot/spot8-01.png",
          preview: true,
          spotId: 8,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511309/Airdnd/08-spot/spot8-02.png",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511311/Airdnd/08-spot/spot8-03.png",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511320/Airdnd/08-spot/spot8-04.png",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511310/Airdnd/08-spot/spot8-05.png",
          preview: false,
          spotId: 8,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511311/Airdnd/09-spot/spot9-01.png",
          preview: true,
          spotId: 9,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511312/Airdnd/09-spot/spot9-02.png",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511310/Airdnd/09-spot/spot9-03.png",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511311/Airdnd/09-spot/spot9-04.png",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511322/Airdnd/09-spot/spot9-05.png",
          preview: false,
          spotId: 9,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511312/Airdnd/10-spot/spot10-01.png",
          preview: true,
          spotId: 10,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511322/Airdnd/10-spot/spot10-02.png",
          preview: false,
          spotId: 10,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511322/Airdnd/10-spot/spot10-03.png",
          preview: false,
          spotId: 10,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511321/Airdnd/10-spot/spot10-04.png",
          preview: false,
          spotId: 10,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511312/Airdnd/10-spot/spot10-05.png",
          preview: false,
          spotId: 10,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511314/Airdnd/11-spot/spot11-01.png",
          preview: true,
          spotId: 11,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511313/Airdnd/11-spot/spot11-02.png",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511314/Airdnd/11-spot/spot11-03.png",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511312/Airdnd/11-spot/spot11-04.png",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511313/Airdnd/11-spot/spot11-05.png",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511313/Airdnd/11-spot/spot11-05.png",
          preview: false,
          spotId: 12,
        },

        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511315/Airdnd/12-spot/spot12-01.png",
          preview: true,
          spotId: 12,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511314/Airdnd/12-spot/spot12-02.png",
          preview: false,
          spotId: 12,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511316/Airdnd/12-spot/spot12-03.png",
          preview: false,
          spotId: 12,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511314/Airdnd/12-spot/spot12-04.png",
          preview: false,
          spotId: 12,
        },
        {
          url: "https://res.cloudinary.com/dkuhmdf7w/image/upload/v1681511315/Airdnd/12-spot/spot12-05.png",
          preview: false,
          spotId: 12,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
