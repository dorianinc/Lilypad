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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25084122/original/c61c6170-cf36-4c6b-aae5-ab777a83ee81.jpeg",
          preview: true,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25084122/original/b3a94a45-edad-47ef-9827-1bebafa0417e.jpeg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25084122/original/0d3d86fc-5fdf-41b9-8801-caf34b8005ca.jpeg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25084122/original/fa06805e-27d8-45be-853f-25a0a7c77f8f.jpeg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25084122/original/be0e13a9-76d4-4552-9249-bff7a5789db6.jpeg",
          preview: false,
          spotId: 1,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-928917685646963557/original/e9e2af32-01b8-4e19-b2be-7115c4575ba5.jpeg",
          preview: true,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-928917685646963557/original/8309f8d5-69d0-40df-9c06-627866516ae7.jpeg",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-928917685646963557/original/21192298-f96a-446c-b9ab-412fe572605a.jpeg",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-928917685646963557/original/53ad4a58-c1d6-4e6c-996a-7025cfbc8ca0.jpeg",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-928917685646963557/original/28e7f00c-a861-46a0-8517-b1b0897c7f7c.jpeg",
          preview: false,
          spotId: 2,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-707429233508053171/original/3ef69355-c259-40ff-a376-de647904a056.jpeg",
          preview: true,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-707429233508053171/original/4dd04b5d-58bb-45e8-bf2a-edfcd5597502.jpeg",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-707429233508053171/original/8cb48def-0366-45f0-9165-60e703b73eee.jpeg",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-707429233508053171/original/8dcccba9-9c57-46fd-b68c-62622fdf284d.jpeg",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-707429233508053171/original/86335a80-5ede-4aa3-959e-45788b22a9e0.jpeg",
          preview: false,
          spotId: 3,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/bc5b38fc-be55-4f16-a8b4-a615843f9911.jpg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/1631e7f8-2c48-4274-948d-019a938e62e0.jpg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/f327e3c5-9c3a-4cea-8429-a0a5d0ba1a4d.jpg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/085ddf54-f17e-49a2-98a3-8918fcb68d09.jpg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/ac67de17-b367-46ef-ba71-cff378eba8f9.jpg",
          preview: false,
          spotId: 4,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-892057952283681562/original/afa50c87-8a19-4bfc-bc7b-a44a3c73acc5.jpeg",
          preview: true,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-892057952283681562/original/56c6a63b-2bd6-4405-a9f2-74d5001be5cb.jpeg",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-892057952283681562/original/59cf63fd-607a-406b-9836-11683cdbb1a3.jpeg",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-892057952283681562/original/6f62d106-2051-4f78-9125-228bd49cc63f.jpeg",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-892057952283681562/original/a7b5c29a-90ae-4c72-92fc-0f5df5211de2.jpeg",
          preview: false,
          spotId: 5,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/bc5b38fc-be55-4f16-a8b4-a615843f9911.jpg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/1631e7f8-2c48-4274-948d-019a938e62e0.jpg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/f327e3c5-9c3a-4cea-8429-a0a5d0ba1a4d.jpg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/085ddf54-f17e-49a2-98a3-8918fcb68d09.jpg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/ac67de17-b367-46ef-ba71-cff378eba8f9.jpg",
          preview: false,
          spotId: 4,
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
