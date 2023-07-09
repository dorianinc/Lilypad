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
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-853890551506118770/original/3c69a376-ce2b-4145-8e10-c84751d735af.png",
          preview: true,
          spotId: 6,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-853890551506118770/original/f4aabe6a-5376-44d8-bda4-6ad29667e4d5.png",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-853890551506118770/original/bf23b1c0-53f9-4707-a300-8c08a0b8acba.png",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-853890551506118770/original/215f3d34-17e3-4b4d-a282-c22c7fa5622a.png",
          preview: false,
          spotId: 6,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-853890551506118770/original/f661b7a1-7c0f-4851-b719-9d7bd067ee80.png",
          preview: false,
          spotId: 6,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/5e5f55e7-b4a9-4fd6-ad0c-b5cbedf94f15.jpeg",
          preview: true,
          spotId: 7,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/56ff5e60-671b-4736-9d50-e3b59dc9d185.jpeg",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/513d82c6-bf29-4b00-a567-6568350e9306.jpeg",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-15058446/original/6d6cf3b5-2859-4524-82b6-51df36debd80.jpeg",
          preview: false,
          spotId: 7,
        },
        {
          url: "https://a0.muscache.com/im/pictures/ad0164c8-acb5-477d-b1d0-19fabd9931cc.jpg",
          preview: false,
          spotId: 7,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31563889/original/d76fff42-f932-4085-ac08-0cfaf264ad61.jpeg",
          preview: true,
          spotId: 8,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31563889/original/22ac4451-37e1-4551-a9f0-0d46bd7821ee.jpeg",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31563889/original/0dbe981d-9329-438c-8b04-751fa6b47458.jpeg",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31563889/original/e5d18c07-b5d9-4454-89e0-64c5a92be75d.jpeg",
          preview: false,
          spotId: 8,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31563889/original/9f823b0e-c093-4429-a7cf-feeb081bfea5.png",
          preview: false,
          spotId: 8,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/a89c9c4f-a24f-428b-9dd6-c171ecae7395.jpg",
          preview: true,
          spotId: 9,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-8631351/original/61f267a4-3401-451f-be74-92b372f3b1da.jpeg",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://a0.muscache.com/im/pictures/e9f5b02e-3fd9-4830-a005-d2837b982724.jpg",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://a0.muscache.com/im/pictures/92e7a208-0330-4fb3-9214-8868249785c1.jpg",
          preview: false,
          spotId: 9,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-8631351/original/bcf2e9a2-ed9d-453a-bfd6-7627c5e6d2af.jpeg",
          preview: false,
          spotId: 9,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/a8f45d83-ff71-4047-8184-3825a3f492d0.jpg",
          preview: true,
          spotId: 10,
        },
        {
          url: "https://a0.muscache.com/im/pictures/b567dc13-5331-4979-b533-75fb50ef3218.jpg",
          preview: false,
          spotId: 10,
        },
        {
          url: "https://a0.muscache.com/im/pictures/c1713a7e-06b1-437f-a700-66d98b8dbe6c.jpg",
          preview: false,
          spotId: 10,
        },
        {
          url: "https://a0.muscache.com/im/pictures/a0ee94e9-66ea-45aa-8a7a-68c47666a89c.jpg",
          preview: false,
          spotId: 10,
        },
        {
          url: "https://a0.muscache.com/im/pictures/1cfa1278-8da0-4149-aabe-55eee1997e9e.jpg",
          preview: false,
          spotId: 10,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/e8f4e285-5a14-469b-9fed-7dc1897298d9.jpg",
          preview: true,
          spotId: 11,
        },
        {
          url: "https://a0.muscache.com/im/pictures/e6f6b1e1-575a-4f7e-a55f-089a032cc91d.jpg",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://a0.muscache.com/im/pictures/9e2d9407-a2d8-491d-aa74-02b47910993a.jpg",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://a0.muscache.com/im/pictures/fc756c01-ac46-4d18-9772-9377a61cebd9.jpg",
          preview: false,
          spotId: 11,
        },
        {
          url: "https://a0.muscache.com/im/pictures/37318007-02f2-4867-91fe-855877f49172.jpg",
          preview: false,
          spotId: 11,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-613869148760315738/original/273c3059-18bc-4c36-868b-562705a9a0b5.jpeg",
          preview: true,
          spotId: 12,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-613869148760315738/original/2fd3e5ff-f465-49bb-a85f-1b7dc1910643.jpeg",
          preview: false,
          spotId: 12,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-613869148760315738/original/a95a3228-93c6-4004-935d-9ac83dc7cbbb.jpeg",
          preview: false,
          spotId: 12,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-613869148760315738/original/a1a67913-e5e2-4038-931c-b3462904dd69.jpeg",
          preview: false,
          spotId: 12,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-613869148760315738/original/e1700a55-3704-4665-affb-9a1afb744e26.jpeg",
          preview: false,
          spotId: 12,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/8a43a57d-6236-4507-87de-ba50d31aac70.jpg",
          preview: true,
          spotId: 13,
        },
        {
          url: "https://a0.muscache.com/im/pictures/52a1e014-5dd6-4414-8789-59e1d030e621.jpg",
          preview: false,
          spotId: 13,
        },
        {
          url: "https://a0.muscache.com/im/pictures/ce31bb1c-8f6a-4705-b31f-1a2ca794c339.jpg",
          preview: false,
          spotId: 13,
        },
        {
          url: "https://a0.muscache.com/im/pictures/d3e62071-4538-4fc1-8df1-5865c81d3fbc.jpg",
          preview: false,
          spotId: 13,
        },
        {
          url: "https://a0.muscache.com/im/pictures/1a3cdf9b-00b1-4f3d-a032-6737663ed322.jpg",
          preview: false,
          spotId: 13,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/575dfaf5-db46-4c77-a0c9-d8d298c49b80.jpg",
          preview: true,
          spotId: 14,
        },
        {
          url: "https://a0.muscache.com/im/pictures/109a49d4-df0d-4177-b0e7-ad6102c62d45.jpg",
          preview: false,
          spotId: 14,
        },
        {
          url: "https://a0.muscache.com/im/pictures/88c92066-ae0e-4256-b9d4-e77bfa703351.jpg",
          preview: false,
          spotId: 14,
        },
        {
          url: "https://a0.muscache.com/im/pictures/54ead9ee-24a5-470b-9b1b-12384e3d25eb.jpg",
          preview: false,
          spotId: 14,
        },
        {
          url: "https://a0.muscache.com/im/pictures/6bed9d1d-1dd8-4e75-94a9-654f30806b9b.jpg",
          preview: false,
          spotId: 14,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/7cc932bf-f12d-476b-a80b-5cd7e0c0f342.jpg",
          preview: true,
          spotId: 15,
        },
        {
          url: "https://a0.muscache.com/im/pictures/fc71aafb-97bf-45e9-a513-ae523b0bc977.jpg",
          preview: false,
          spotId: 15,
        },
        {
          url: "https://a0.muscache.com/im/pictures/38484e43-0ad3-48c7-a25d-a2b90d1cd30b.jpg",
          preview: false,
          spotId: 15,
        },
        {
          url: "https://a0.muscache.com/im/pictures/22c1f4fb-7fcd-43ac-b66a-f4578da0a76e.jpg",
          preview: false,
          spotId: 15,
        },
        {
          url: "https://a0.muscache.com/im/pictures/c559c7df-84f5-42f7-81a7-762e9d82cb48.jpg",
          preview: false,
          spotId: 15,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-887148299819459014/original/0f77c3f4-7091-448e-bf4e-deb8fe4f63fa.jpeg",
          preview: true,
          spotId: 16,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-887148299819459014/original/fb087ee1-2449-497c-8d02-6b4a2ad8f4b6.jpeg",
          preview: false,
          spotId: 16,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-887148299819459014/original/91ad6300-b123-494a-900a-12447bd8ff29.jpeg",
          preview: false,
          spotId: 16,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-887148299819459014/original/96dfdc89-55cb-4807-b986-632d1abea4c4.jpeg",
          preview: false,
          spotId: 16,
        },
        {
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-887148299819459014/original/c9a6ee84-86b7-4c90-8f00-bdf0c1d75133.jpeg",
          preview: false,
          spotId: 16,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-889959225886125243/original/e76359af-ab43-42da-b797-e11d692138de.jpeg",
          preview: true,
          spotId: 17,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-889959225886125243/original/8e92a215-04c9-40d8-a4fb-49ebbd7bcb09.jpeg",
          preview: false,
          spotId: 17,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-889959225886125243/original/e1d1883d-906d-4e42-baff-079450ae1441.jpeg",
          preview: false,
          spotId: 17,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-889959225886125243/original/5d167ee1-41ca-4910-8197-dd6dcd5325e8.jpeg",
          preview: false,
          spotId: 17,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-889959225886125243/original/3d52ec16-accc-4a90-a6cb-95fc4c2b9448.jpeg",
          preview: false,
          spotId: 17,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51044188/original/64d8ffb5-225a-4a45-a6af-8c08b5ddf05c.jpeg",
          preview: true,
          spotId: 18,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51044188/original/f63697ce-2b12-4499-bcd7-2d3f0b43feec.jpeg",
          preview: false,
          spotId: 18,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51044188/original/fb5d05ec-c02f-455d-bb7f-da058503ae1d.jpeg",
          preview: false,
          spotId: 18,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51044188/original/f30b4e55-a755-4bed-8857-349389ccf103.jpeg",
          preview: false,
          spotId: 18,
        },
        {
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51044188/original/1856ea38-a934-4b25-be83-3f29c4b6f5c0.jpeg",
          preview: false,
          spotId: 18,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/04e2555c-fe81-4bd0-921d-6745d3a0fb1b.jpg",
          preview: true,
          spotId: 19,
        },
        {
          url: "https://a0.muscache.com/im/pictures/878635a8-dd3a-407b-9c05-455028269b79.jpg",
          preview: false,
          spotId: 19,
        },
        {
          url: "https://a0.muscache.com/im/pictures/463d08e5-4588-44aa-9972-f8ada1b75fb5.jpg",
          preview: false,
          spotId: 19,
        },
        {
          url: "https://a0.muscache.com/im/pictures/e8c61257-8a93-445a-bfa1-d47e00291d33.jpg",
          preview: false,
          spotId: 19,
        },
        {
          url: "https://a0.muscache.com/im/pictures/a1867d17-0800-4c16-b554-b5773b1862e3.jpg",
          preview: false,
          spotId: 19,
        },
        ///////////////////////////////////////////////////////////////////////////
        {
          url: "https://a0.muscache.com/im/pictures/88e49341-f454-4e82-85b3-278ef93a9e78.jpg",
          preview: true,
          spotId: 20,
        },
        {
          url: "https://a0.muscache.com/im/pictures/0407498f-dc3e-434e-8349-0ee7263ac0fd.jpg",
          preview: false,
          spotId: 20,
        },
        {
          url: "https://a0.muscache.com/im/pictures/a6c9ab61-3c2e-4008-9894-12821be88b20.jpg",
          preview: false,
          spotId: 20,
        },
        {
          url: "https://a0.muscache.com/im/pictures/b8dccb4e-104f-490a-9f6e-d820d243c5e5.jpg",
          preview: false,
          spotId: 20,
        },
        {
          url: "https://a0.muscache.com/im/pictures/4c68bf5a-8031-4866-8d21-f00804d44335.jpg",
          preview: false,
          spotId: 20,
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
