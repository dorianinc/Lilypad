"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          address: "Dragon's Roost", // 1
          city: "Waterdeep",
          state: "Forgotten Realms",
          country: "Evermeet",
          lat: 39.9526,
          lng: -75.1652,
          name: "The Dragon's Lair",
          description:
            "A sprawling dungeon filled with traps and treasure, guarded by a powerful red dragon.",
          price: 150,
          ownerId: 3,
        },
        {
          address: "Goblin's Grotto", // 2
          city: "Baldur's Gate",
          state: "Forgotten Realms",
          country: "Murghôm",
          lat: 37.7749,
          lng: -122.4194,
          name: "The Goblin Market",
          description:
            "A bustling bazaar filled with exotic goods, run by a gang of goblin merchants.",
          price: 75,
          ownerId: 2,
        },
        {
          address: "Draconic Delight", // 3
          city: "Neverwinter",
          state: "Forgotten Realms",
          country: "Aglarond",
          lat: 40.7128,
          lng: -74.006,
          name: "The Red Dragon Inn",
          description:
            "A cozy tavern with hearty food and drink, frequented by adventurers and dragons alike.",
          price: 100,
          ownerId: 1,
        },
        {
          address: "Orcish Outpost", // 4
          city: "Icewind Dale",
          state: "Forgotten Realms",
          country: "Damara",
          lat: 51.5074,
          lng: -0.1278,
          name: "The Iron Fortress",
          description:
            "A massive fortress built into a mountain, home to a tribe of fearsome orc warriors.",
          price: 125,
          ownerId: 4,
        },
        {
          address: "Wizard's Workshop", // 5
          city: "Cormyr",
          state: "Forgotten Realms",
          country: "Evermeet",
          lat: 35.6895,
          lng: 139.6917,
          name: "The Arcane Tower",
          description: "A towering spire filled with arcane wonders, guarded by a powerful wizard.",
          price: 175,
          ownerId: 5,
        },
        {
          address: "Underground Underworld", // 6
          city: "Sigil",
          state: "Planescape",
          country: "Murghôm",
          lat: 51.5072,
          lng: -0.1276,
          name: "The Underdark",
          description:
            "A vast network of underground caverns filled with strange creatures and ancient ruins.",
          price: 200,
          ownerId: 6,
        },
        {
          address: "Elemental Estate", // 7
          city: "The Elemental Plane of Fire",
          state: "Elemental Planes",
          country: "Aglarond",
          lat: 37.7749,
          lng: -122.4194,
          name: "The Flame Palace",
          description: "A palace made of living fire, ruled by a powerful fire elemental lord.",
          price: 100,
          ownerId: 2,
        },
        {
          address: "Frosthold Way", // 8
          city: "Winterhaven",
          state: "Nentir Vale",
          country: "Aglarond",
          lat: 39.870407,
          lng: -75.749434,
          name: "Frosthold Lodge",
          description:
            "Necromancers once called this place home, now it serves as a winter retreat for weary travelers. Cozy up by the fire or take a stroll through the snowy woods. You never know what you might find.",
          price: 128,
          ownerId: 4,
        },
        {
          address: "Briarkeep Lane", // 9
          city: "Waterdeep",
          state: "Sword Coast",
          country: "Evermeet",
          lat: 32.7767,
          lng: -96.797,
          name: "Briarkeep Inn",
          description:
            "Nestled in the heart of Waterdeep, Briarkeep Inn offers a quiet respite from the hustle and bustle of city life. Enjoy a warm meal and a comfortable bed, and wake up refreshed and ready to explore the city.",
          price: 84,
          ownerId: 3,
        },
        {
          address: "Shadowdale Road", // 10
          city: "Shadowdale",
          state: "Dalelands",
          country: "Damara",
          lat: 39.9042,
          lng: -76.8606,
          name: "Shadowdale Cottage",
          description:
            "This quaint cottage is the perfect getaway for those seeking peace and quiet. Surrounded by the beauty of the Dalelands, you'll forget all your troubles as you relax in the cozy living room or take a stroll through the nearby woods.",
          price: 105,
          ownerId: 2,
        },
        {
          address: "Moonstone Lane", // 11
          city: "Neverwinter",
          state: "Sword Coast",
          country: "Murghôm",
          lat: 47.6062,
          lng: -122.3321,
          name: "Moonstone Manor",
          description:
            "Step into another world when you enter Moonstone Manor. With its enchanting decor and magical atmosphere, you'll feel like you've stepped into a fairy tale. Enjoy a cup of tea by the fire or take a moonlit walk through the gardens.",
          price: 195,
          ownerId: 5,
        },
        {
          address: "Dragonfire Way", // 12
          city: "Baldur's Gate",
          state: "Sword Coast",
          country: "Evermeet",
          lat: 37.7749,
          lng: -122.4194,
          name: "Dragonfire Inn",
          description:
            "The Dragonfire Inn has been a fixture of Baldur's Gate for centuries. With its warm atmosphere and cozy rooms, it's the perfect place to rest your head after a long day of adventuring. Don't forget to try the famous Dragonfire ale!",
          price: 87,
          ownerId: 1,
        },
        {
          address: "The Rusty Anvil", // 13
          city: "Waterdeep",
          state: "Faerun",
          country: "Evermeet",
          lat: 38.9072,
          lng: -77.0369,
          name: "The Rusty Anvil Inn",
          description: "Nestled in the heart of Waterdeep, The Rusty Anvil is the perfect place for weary adventurers to rest and recuperate. With comfortable rooms, a cozy fireplace, and a well-stocked bar, you'll feel right at home in this charming inn.",
          price: 150,
          ownerId: 3
        },
        {
          address: "Dragon's Lair", // 14
          city: "Baldur's Gate",
          state: "Amn",
          country: "Damara",
          lat: 37.7749,
          lng: -122.4194,
          name: "Dragon's Lair Armory",
          description: "Looking for the finest arms and armor in all of Baldur's Gate? Look no further than Dragon's Lair Armory. Our expert craftsmen use only the finest materials to create weapons and armor that are both beautiful and deadly.",
          price: 75,
          ownerId: 1
        },
        {
          address: "The Sleeping Dragon", // 15
          city: "Neverwinter",
          state: "Sword Coast",
          country: "Aglarond",
          lat: 40.7128,
          lng: -74.0060,
          name: "The Sleeping Dragon Tavern",
          description: "If you're looking for a place to drink, gamble, and carouse in Neverwinter, look no further than The Sleeping Dragon Tavern. Our selection of ale is unmatched, and our dice games are always lively.",
          price: 100,
          ownerId: 5
        },
        {
          address: "The Crystal Caverns", // 16
          city: "Mithral Hall",
          state: "The North",
          country: "Murghôm",
          lat: 51.5074,
          lng: -0.1278,
          name: "The Crystal Caverns Spa",
          description: "Escape the hustle and bustle of Mithral Hall and indulge in some well-deserved pampering at The Crystal Caverns Spa. Our hot springs, massages, and herbal teas will leave you feeling rejuvenated and refreshed.",
          price: 200,
          ownerId: 2
        },
        {
          address: "The Tower of Sorcery", // 17
          city: "Cormyr",
          state: "Cormyr",
          country: "Aglarond",
          lat: 51.5074,
          lng: -0.1278,
          name: "The Tower of Sorcery",
          description: "For wizards and sorcerers seeking a place to hone their craft, look no further than The Tower of Sorcery. Our library is stocked with tomes on every arcane subject, and our laboratories are fully equipped for all manner of experiments.",
          price: 175,
          ownerId: 4
        },
        {
          address: "Raven's Roost", // 18
          city: "Winterhold",
          state: "Skyrim",
          country: "Evermeet",
          lat: 43.6532,
          lng: -79.3832,
          name: "The Frozen Fang Inn",
          description: "Nestled in the heart of the ancient city of Winterhold, The Frozen Fang Inn offers adventurers a cozy and comfortable place to rest and recuperate. Our warm hearth, hearty meals, and friendly staff will make you feel right at home.",
          price: 150,
          ownerId: 4
        },
        {
          address: "Serpent's Lair", // 19
          city: "Waterdeep",
          state: "Sword Coast",
          country: "Aglarond",
          lat: 33.2148,
          lng: -97.1331,
          name: "The Enchanted Grove",
          description: "Tucked away in a peaceful grove just outside the bustling city of Waterdeep, The Enchanted Grove is the perfect place to escape the hustle and bustle of city life. Our luxurious suites, tranquil gardens, and magical atmosphere will leave you feeling refreshed and renewed.",
          price: 175,
          ownerId: 2
        },
        {
          address: "Dragon's Den", // 20
          city: "Baldur's Gate",
          state: "Amn",
          country: "Murghôm",
          lat: 41.8781,
          lng: -87.6298,
          name: "The Golden Dragon Inn",
          description: "Located in the heart of Baldur's Gate, The Golden Dragon Inn is the perfect place to experience the rich culture and history of Amn. Our comfortable rooms, delicious food, and friendly staff will make your stay unforgettable.",
          price: 100,
          ownerId: 6
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
