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
          url: "https://a0.muscache.com/im/pictures/6be38c62-1b2a-47c3-8cd7-3cb4da749509.jpg",
          preview: true,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/c70a89f6-b329-40b6-b879-c00986e85a17.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/8f3c3488-db61-4429-ab99-6f777729ca88.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/02141710-4ad3-42eb-86cd-22ee91502f0a.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/fc93312d-01dc-491c-b92d-16e5a9ca170f.jpg",
          preview: false,
          spotId: 1,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-715990626223541790/original/694ee517-4dd7-4ace-92d6-c96ec635bdf0.jpeg",
          preview: true,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/0b7dcdb1-a123-426a-b0e2-b85987c00d74.jpg",
          preview: false,
          spotId: 2,
        },
        {
          url: "https://a0.muscache.com/im/pictures/81edf38e-921c-41b5-b3c1-f8aee7a44f1b.jpg",
          preview: true,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-45017115/original/cca3c527-9517-4664-921e-fda4b6fc9976.jpeg",
          preview: false,
          spotId: 3,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-49064078/original/d0377911-55ef-4388-b984-8f66bbae4eb4.jpeg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-49064078/original/f159f420-d7d7-4c72-8569-0cfc127b1b9b.jpeg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-49064078/original/a5ca399e-15ab-43a1-bc9d-c349a10282be.jpeg",
          preview: true,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-49064078/original/14df687b-d0bc-4eb8-ac6c-6b74d4f075ce.jpeg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-49064078/original/e0a55c74-5a4c-4f29-b501-c919e5c10e9f.jpeg",
          preview: false,
          spotId: 4,
        },
        {
          url: "https://a0.muscache.com/im/pictures/81564d9e-cc1f-4033-9791-ef751569e40a.jpg",
          preview: true,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/74dc9b02-3f53-4b8a-b73d-f983eedf0e32.jpg",
          preview: false,
          spotId: 5,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-43149938/original/79e4ea7c-cde4-42ce-b7b7-16eda56927f0.jpeg",
          preview: true,
          spotId: 6,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50621178/original/788c5c41-daa9-4a67-b88f-d891585720aa.jpeg",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-29389628/original/db459df4-439c-485c-891a-e370cac880b5.jpeg",
          preview: true,
          spotId: 7,
        },
        {
          url: "https://a0.muscache.com/im/pictures/816723e8-e265-4aa1-b1b9-f4748abdf564.jpg",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://a0.muscache.com/im/pictures/1f7a3da2-427b-443a-b62d-fab450b70123.jpg",
          preview: true,
          spotId: 8,
        },
        {
          url: "https://a0.muscache.com/im/pictures/2a0a8543-a4e0-4f13-84f5-a01facfe640f.jpg",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://a0.muscache.com/im/pictures/58f7249d-32b9-453c-8a8c-7ec509064b1d.jpg",
          preview: true,
          spotId: 9,
        },
        {
          url: "https://a0.muscache.com/im/pictures/9ed97ddc-99f6-4ba2-8100-94abdbcb06e7.jpg",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-802793352174858729/original/96199f15-9abc-4d80-b4ae-0b9cc37ecc0d.jpeg",
          preview: true,
          spotId: 10,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-802793352174858729/original/23f011de-2b15-4ae7-a89b-ca1f15e2b9fd.jpeg",
          preview: false,
          spotId: 10,
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
