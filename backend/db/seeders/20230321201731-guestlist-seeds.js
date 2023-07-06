// "use strict";
// const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA; // define your schema in options object
// }

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     options.tableName = "GuestLists";
//     return queryInterface.bulkInsert(
//       options,
//       [
//         {
//           numAdults: 3,
//           numChildren: 2,
//           numInfants: 0,
//           bookingId: 1,
//         },
//         {
//           numAdults: 4,
//           numChildren: 2,
//           numInfants: 0,
//           bookingId: 2,
//         },
//         {
//           numAdults: 5,
//           numChildren: 2,
//           numInfants: 1,
//           bookingId: 3,
//         },
//         {
//           numAdults: 2,
//           numChildren: 2,
//           numInfants: 2,
//           bookingId: 4,
//         },
//         {
//           numAdults: 2,
//           numChildren: 3,
//           numInfants: 2,
//           bookingId: 5,
//         },
//         {
//           numAdults: 3,
//           numChildren: 2,
//           numInfants: 2,
//           bookingId: 6,
//         },
//         {
//           numAdults: 2,
//           numChildren: 2,
//           numInfants: 1,
//           bookingId: 7,
//         },
//         {
//           numAdults: 2,
//           numChildren: 2,
//           numInfants: 7,
//           bookingId: 8,
//         },
//         {
//           numAdults: 2,
//           numChildren: 2,
//           numInfants: 7,
//           bookingId: 9,
//         },
//         {
//           numAdults: 2,
//           numChildren: 0,
//           numInfants: 0,
//           bookingId: 10,
//         },
//       ],
//       {}
//     );
//   },

//   down: async (queryInterface, Sequelize) => {
//     options.tableName = "GuestLists";
//     return queryInterface.bulkDelete(options, null, {});
//   },
// };
