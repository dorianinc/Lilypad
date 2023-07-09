"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          review:
            "We enjoyed our time at this spot. The host was welcoming and provided great recommendations for local attractions.",
          stars: 3,
          spotId: 3,
          userId: 1,
        },
        {
          review:
            "Absolutely loved our stay! The spot was beautifully designed and had all the amenities we needed. Can't wait to come back!",
          stars: 5,
          spotId: 4,
          userId: 1,
        },
        {
          review:
            "Great spot! Spacious and clean with a fantastic view. The host was helpful and accommodating. Would definitely recommend.",
          stars: 4,
          spotId: 5,
          userId: 1,
        },
        {
          review:
            "This spot exceeded our expectations. The attention to detail in the decor and amenities was impressive. A truly memorable stay!",
          stars: 5,
          spotId: 6,
          userId: 1,
        },
        {
          review:
            "We had a pleasant stay at this spot. The location was convenient, and the place was clean and comfortable. Recommended!",
          stars: 4,
          spotId: 7,
          userId: 1,
        },
        {
          review:
            "Enjoyed our time at this spot. The host was friendly and responsive. The property had all the necessary amenities. Thank you!",
          stars: 3,
          spotId: 8,
          userId: 1,
        },
        {
          review:
            "The spot was perfect for our vacation. Clean, well-maintained, and in a great location. Would definitely stay here again!",
          stars: 5,
          spotId: 9,
          userId: 1,
        },
        {
          review:
            "Had a lovely time at this spot. The interior was tastefully designed and the views were breathtaking. Highly recommended!",
          stars: 4,
          spotId: 10,
          userId: 1,
        },
        {
          review:
            "Our experience at this spot was fantastic! The host was incredibly accommodating and the location was ideal. Highly recommended!",
          stars: 4,
          spotId: 1,
          userId: 2,
        },
        {
          review:
            "We had an amazing time at this spot. The interior was stylish and comfortable, and the host provided excellent recommendations.",
          stars: 5,
          spotId: 2,
          userId: 2,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The interior was tastefully decorated and the views were breathtaking. Highly recommended!",
          stars: 4,
          spotId: 5,
          userId: 2,
        },
        {
          review:
            "The host was exceptional and made our stay at this spot memorable. The property was clean, cozy, and had all the necessary amenities.",
          stars: 5,
          spotId: 6,
          userId: 2,
        },
        {
          review:
            "Our experience at this spot was great! The location was ideal and the house was clean and comfortable. Highly recommend staying here.",
          stars: 4,
          spotId: 7,
          userId: 2,
        },
        {
          review:
            "We had a pleasant stay at this spot. The host was friendly and responsive, and the property had everything we needed. Thank you!",
          stars: 3,
          spotId: 8,
          userId: 2,
        },
        {
          review:
            "This spot was perfect for our getaway. The house was well-maintained, the location was great, and the host was welcoming. Recommended!",
          stars: 5,
          spotId: 9,
          userId: 2,
        },
        {
          review:
            "Had a wonderful time at this spot. The interior was beautifully designed and the amenities provided exceeded our expectations. A+!",
          stars: 4,
          spotId: 10,
          userId: 2,
        },
        {
          review:
            "We had a delightful stay at this spot. The host was friendly and the house was charming. Highly recommend for a cozy getaway!",
          stars: 4,
          spotId: 1,
          userId: 3,
        },
        {
          review:
            "This spot was a hidden gem! The interior was beautifully decorated and the location was peaceful. We enjoyed every moment here.",
          stars: 5,
          spotId: 2,
          userId: 3,
        },
        {
          review:
            "Our stay at this spot was pleasant. The house was clean and comfortable, and the host provided helpful local recommendations.",
          stars: 3,
          spotId: 3,
          userId: 3,
        },
        {
          review:
            "Had a fantastic experience at this spot. The house had a cozy atmosphere, and the host was accommodating and responsive.",
          stars: 5,
          spotId: 4,
          userId: 3,
        },
        {
          review:
            "Our stay at this spot was pleasant and relaxing. The location was convenient and the house had all the necessary amenities.",
          stars: 4,
          spotId: 7,
          userId: 3,
        },
        {
          review:
            "We had a wonderful time at this spot. The host was friendly and responsive, making our stay even more enjoyable. Highly recommended!",
          stars: 3,
          spotId: 8,
          userId: 3,
        },

        {
          review:
            "This spot was perfect for our vacation. The house was clean, comfortable, and well-equipped. Would definitely book again!",
          stars: 5,
          spotId: 9,
          userId: 3,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was beautifully designed, and the location provided stunning views. A great experience!",
          stars: 4,
          spotId: 10,
          userId: 3,
        },
        {
          review:
            "We had a fantastic time at this spot. The host was friendly and accommodating, and the house was clean and comfortable. Highly recommend!",
          stars: 4,
          spotId: 1,
          userId: 4,
        },
        {
          review:
            "This spot exceeded our expectations! The interior was beautifully decorated and the location was perfect. A wonderful stay overall.",
          stars: 5,
          spotId: 2,
          userId: 4,
        },
        {
          review:
            "Our experience at this spot was pleasant. The house had a cozy atmosphere and the host provided helpful local tips.",
          stars: 3,
          spotId: 3,
          userId: 4,
        },
        {
          review:
            "Had a great time at this spot. The house was spacious, well-maintained, and the host was responsive to our needs.",
          stars: 5,
          spotId: 4,
          userId: 4,
        },
        {
          review:
            "Had a great time at this spot. The house was spacious, well-maintained, and the host was responsive to our needs.",
          stars: 5,
          spotId: 4,
          userId: 4,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The interior was stylish and comfortable, and the amenities were top-notch.",
          stars: 4,
          spotId: 5,
          userId: 4,
        },
        {
          review:
            "The host made our stay at this spot memorable. The property was well-kept and the location was convenient. Highly recommended!",
          stars: 5,
          spotId: 6,
          userId: 4,
        },
        {
          review:
            "This spot was perfect for our vacation. The house was clean, well-equipped, and the location was ideal. Would definitely return!",
          stars: 5,
          spotId: 9,
          userId: 4,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was beautifully designed, and the location offered breathtaking views. Highly recommend!",
          stars: 4,
          spotId: 10,
          userId: 4,
        },
        {
          review:
            "We had a wonderful time at this spot. The host was welcoming and the house was clean and comfortable. Highly recommended!",
          stars: 4,
          spotId: 1,
          userId: 5,
        },
        {
          review:
            "This spot was amazing! The interior was beautifully designed and the location was perfect for our needs. A great experience overall.",
          stars: 5,
          spotId: 2,
          userId: 5,
        },
        {
          review:
            "Our stay at this spot was pleasant. The house had a cozy atmosphere, and the host provided helpful local recommendations.",
          stars: 3,
          spotId: 3,
          userId: 5,
        },
        {
          review:
            "Had a fantastic experience at this spot. The house was clean, spacious, and the host was responsive and accommodating.",
          stars: 5,
          spotId: 4,
          userId: 5,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The interior was stylish and comfortable, and the amenities exceeded our expectations.",
          stars: 4,
          spotId: 5,
          userId: 5,
        },
        {
          review:
            "The host was exceptional, ensuring our stay at this spot was memorable. The property was well-maintained and the location was convenient.",
          stars: 5,
          spotId: 6,
          userId: 5,
        },
        {
          review:
            "Our stay at this spot was enjoyable. The location was great, and the house had all the necessary amenities for a comfortable stay.",
          stars: 4,
          spotId: 7,
          userId: 5,
        },
        {
          review:
            "We had a wonderful experience at this spot. The host was friendly and responsive, making our stay even more enjoyable. Highly recommended!",
          stars: 3,
          spotId: 8,
          userId: 5,
        },
        {
          review:
            "We had a wonderful stay at this spot. The host was friendly and accommodating, and the property exceeded our expectations. Highly recommended!",
          stars: 4,
          userId: 1,
          spotId: 11,
        },
        {
          review:
            "Our experience at this spot was fantastic! The location was convenient, the amenities were top-notch, and the host was welcoming. A great choice!",
          stars: 5,
          userId: 1,
          spotId: 12,
        },
        {
          review:
            "We thoroughly enjoyed our time at this spot. The interior was stylish, the views were breathtaking, and the overall ambiance was perfect. Definitely recommend!",
          stars: 4,
          userId: 1,
          spotId: 13,
        },
        {
          review:
            "Had a pleasant stay at this spot. The house was clean, comfortable, and had all the necessary amenities. The host was also very responsive and helpful.",
          stars: 3,
          userId: 1,
          spotId: 14,
        },
        {
          review:
            "This spot was a hidden gem! The location was peaceful, the decor was charming, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 1,
          spotId: 15,
        },
        {
          review:
            "We had an amazing time at this spot. The property was stunning, the attention to detail was impeccable, and the host was incredibly hospitable. A perfect stay!",
          stars: 5,
          userId: 1,
          spotId: 16,
        },
        {
          review:
            "The spot exceeded our expectations. It was clean, spacious, and beautifully furnished. The host provided excellent recommendations for local attractions.",
          stars: 4,
          userId: 1,
          spotId: 17,
        },
        {
          review:
            "Our stay at this spot was fantastic! The location was ideal, the house was well-equipped, and the host was friendly and accommodating. Highly recommended!",
          stars: 5,
          userId: 1,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect choice for our vacation. The amenities were excellent, the surroundings were serene, and the host made us feel right at home.",
          stars: 4,
          userId: 1,
          spotId: 19,
        },
        {
          review:
            "Had a great time at this spot. The interior was stylish, the outdoor area was beautiful, and the host was responsive and helpful. Would stay again!",
          stars: 4,
          userId: 1,
          spotId: 20,
        },
        {
          review:
            "We had a memorable stay at this spot. The host was welcoming and provided excellent recommendations for local attractions. The property was clean and comfortable.",
          stars: 4,
          userId: 2,
          spotId: 11,
        },
        {
          review:
            "Our experience at this spot was outstanding! The location was convenient, the amenities were top-notch, and the host was exceptionally friendly and helpful.",
          stars: 5,
          userId: 2,
          spotId: 12,
        },
        {
          review:
            "We thoroughly enjoyed our time at this spot. The interior was beautifully designed, the views were breathtaking, and the overall atmosphere was perfect for relaxation.",
          stars: 4,
          userId: 2,
          spotId: 13,
        },
        {
          review:
            "Had a pleasant stay at this spot. The house was cozy, well-maintained, and had all the necessary amenities. The host was also very responsive and accommodating.",
          stars: 3,
          userId: 2,
          spotId: 14,
        },
        {
          review:
            "This spot was a hidden gem! The location was peaceful, the decor was charming, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 2,
          spotId: 15,
        },
        {
          review:
            "We had a fantastic time at this spot. The property was stunning, the attention to detail was impeccable, and the host was incredibly hospitable. A perfect stay!",
          stars: 5,
          userId: 2,
          spotId: 16,
        },
        {
          review:
            "The spot exceeded our expectations. It was clean, spacious, and beautifully furnished. The host provided excellent recommendations for local attractions.",
          stars: 4,
          userId: 2,
          spotId: 17,
        },
        {
          review:
            "Our stay at this spot was amazing! The location was ideal, the house was well-equipped, and the host was friendly and accommodating. Highly recommended!",
          stars: 5,
          userId: 2,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect choice for our vacation. The amenities were excellent, the surroundings were serene, and the host made us feel right at home.",
          stars: 4,
          userId: 2,
          spotId: 19,
        },
        {
          review:
            "Had a great time at this spot. The interior was stylish, the outdoor area was beautiful, and the host was responsive and helpful. Would stay again!",
          stars: 4,
          userId: 2,
          spotId: 20,
        },
        {
          review:
            "We had a wonderful stay at this spot. The host was attentive and provided great recommendations for local attractions. The property was clean, comfortable, and had stunning views.",
          stars: 5,
          userId: 3,
          spotId: 11,
        },
        {
          review:
            "Our experience at this spot was exceptional! The house was beautifully designed, the amenities were top-notch, and the host made us feel welcomed throughout our stay.",
          stars: 5,
          userId: 3,
          spotId: 12,
        },
        {
          review:
            "This spot exceeded our expectations in every way. The location was perfect, the interior was tastefully decorated, and the host was friendly and accommodating.",
          stars: 5,
          userId: 3,
          spotId: 13,
        },
        {
          review:
            "Had a lovely stay at this spot. The house was cozy, well-maintained, and had all the necessary amenities. The host was also helpful and responsive to our needs.",
          stars: 4,
          userId: 3,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The atmosphere was tranquil, the decor was charming, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 3,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was absolutely fantastic. The property was stunning, the attention to detail was impeccable, and the host provided exceptional hospitality.",
          stars: 5,
          userId: 3,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and beautifully furnished. The host provided helpful recommendations for local attractions.",
          stars: 4,
          userId: 3,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was friendly and welcoming. Highly recommended!",
          stars: 5,
          userId: 3,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect getaway for our vacation. The amenities were excellent, the surroundings were serene, and the host made us feel right at home.",
          stars: 4,
          userId: 3,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was stylish, the outdoor area was inviting, and the host was attentive to our needs. Would definitely return!",
          stars: 4,
          userId: 3,
          spotId: 20,
        },

        {
          review:
            "We had a pleasant stay at this spot. The host was accommodating and the property was clean and comfortable. Recommended!",
          stars: 3,
          userId: 4,
          spotId: 11,
        },
        {
          review:
            "Our experience at this spot was memorable. The house had a cozy atmosphere and the host provided helpful local recommendations. Enjoyed our stay!",
          stars: 4,
          userId: 4,
          spotId: 12,
        },
        {
          review:
            "Had a fantastic time at this spot. The interior was beautifully designed and the location was perfect for exploring the area. Highly recommended!",
          stars: 5,
          userId: 4,
          spotId: 13,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The house was spacious, well-maintained, and the host was friendly and responsive. Great experience overall!",
          stars: 5,
          userId: 4,
          spotId: 14,
        },
        {
          review:
            "This spot was a hidden gem! The host was welcoming, the property was immaculate, and the surrounding scenery was breathtaking. Highly recommend!",
          stars: 4,
          userId: 4,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was incredible. The house had everything we needed, the views were stunning, and the host was attentive to our needs. A+!",
          stars: 5,
          userId: 4,
          spotId: 16,
        },
        {
          review:
            "Had a great time at this spot. The location was convenient, the house was well-equipped, and the host was responsive and helpful. Recommended!",
          stars: 4,
          userId: 4,
          spotId: 17,
        },
        {
          review:
            "We had a wonderful stay at this spot. The house was clean, comfortable, and had all the amenities we needed. The host was friendly and accommodating.",
          stars: 5,
          userId: 4,
          spotId: 18,
        },
        {
          review:
            "This spot was perfect for our vacation. The house had a charming atmosphere, the location was ideal, and the host was gracious. Highly recommended!",
          stars: 4,
          userId: 4,
          spotId: 19,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was tastefully designed, the outdoor space was relaxing, and the host was attentive. A great experience!",
          stars: 4,
          userId: 4,
          spotId: 20,
        },
        {
          review:
            "Our stay at this spot was fantastic. The house was beautiful, the amenities were top-notch, and the host went above and beyond to ensure our comfort.",
          stars: 5,
          userId: 5,
          spotId: 11,
        },
        {
          review:
            "We had an amazing time at this spot. The location was perfect, the house was spacious and well-maintained, and the host was friendly and helpful. A+!",
          stars: 5,
          userId: 5,
          spotId: 12,
        },
        {
          review:
            "This spot exceeded our expectations. The interior was stylish and comfortable, the views were breathtaking, and the host provided excellent service. Highly recommend!",
          stars: 5,
          userId: 5,
          spotId: 13,
        },
        {
          review:
            "Had a lovely stay at this spot. The house was clean, cozy, and had all the necessary amenities. The host was also responsive and accommodating.",
          stars: 4,
          userId: 5,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The property was stunning, the attention to detail was impeccable, and the host made us feel right at home. Highly recommended!",
          stars: 5,
          userId: 5,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was absolutely fantastic. The house was luxurious, the amenities were top-notch, and the host provided exceptional service. A perfect getaway!",
          stars: 5,
          userId: 5,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and beautifully furnished. The host was also friendly and provided great local recommendations.",
          stars: 4,
          userId: 5,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was welcoming and accommodating. Highly recommend!",
          stars: 5,
          userId: 5,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect getaway for our vacation. The amenities were excellent, the surroundings were serene, and the host made us feel right at home. A wonderful experience!",
          stars: 4,
          userId: 5,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was stylish, the outdoor area was inviting, and the host provided exceptional service. Would definitely come back!",
          stars: 4,
          userId: 5,
          spotId: 20,
        },
        {
          review:
            "Our stay at this spot was wonderful. The house was cozy, the location was peaceful, and the host was friendly and accommodating. Highly recommended!",
          stars: 4,
          userId: 6,
          spotId: 11,
        },
        {
          review:
            "This spot was a hidden gem! The interior was beautifully decorated, the amenities were top-notch, and the host made us feel right at home. A fantastic experience!",
          stars: 5,
          userId: 6,
          spotId: 12,
        },
        {
          review:
            "Had a fantastic time at this spot. The house was spacious, clean, and well-equipped. The host was also responsive and provided helpful local tips. Recommended!",
          stars: 4,
          userId: 6,
          spotId: 13,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The location was perfect, the house had a cozy atmosphere, and the host was friendly and accommodating. Great experience overall!",
          stars: 5,
          userId: 6,
          spotId: 14,
        },
        {
          review:
            "This spot exceeded our expectations. The interior was tastefully designed, the views were breathtaking, and the host provided exceptional service. Highly recommend!",
          stars: 5,
          userId: 6,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was amazing. The house was beautiful, the amenities were excellent, and the host went above and beyond to ensure our comfort. A+!",
          stars: 5,
          userId: 6,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our vacation. It was clean, spacious, and had all the necessary amenities. The host was also helpful and provided great recommendations.",
          stars: 4,
          userId: 6,
          spotId: 17,
        },
        {
          review:
            "We had a wonderful stay at this spot. The house was comfortable, the location was ideal, and the host was welcoming and attentive. Highly recommended!",
          stars: 5,
          userId: 6,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect getaway for us. The house was cozy, the surroundings were peaceful, and the host provided exceptional hospitality. A great experience!",
          stars: 4,
          userId: 6,
          spotId: 19,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. Highly recommend!",
          stars: 4,
          userId: 6,
          spotId: 20,
        },
        {
          review:
            "We had a fantastic time at this spot. The house was clean, stylish, and well-equipped. The host was friendly, responsive, and provided great recommendations.",
          stars: 4,
          userId: 7,
          spotId: 11,
        },
        {
          review:
            "This spot was absolutely amazing. The interior was stunning, the amenities were top-notch, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 7,
          spotId: 12,
        },
        {
          review:
            "Our stay at this spot was incredible. The house had a cozy atmosphere, the views were breathtaking, and the host provided exceptional service. A perfect getaway!",
          stars: 5,
          userId: 7,
          spotId: 13,
        },
        {
          review:
            "Had a lovely time at this spot. The house was clean, comfortable, and had all the necessary amenities. The host was friendly and responsive. Recommended!",
          stars: 4,
          userId: 7,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The property was beautiful, the attention to detail was impressive, and the host made us feel right at home. Highly recommend!",
          stars: 5,
          userId: 7,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was exceptional. The house was luxurious, the amenities were top-notch, and the host provided excellent service. A wonderful experience!",
          stars: 5,
          userId: 7,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 7,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was welcoming and accommodating. Recommended!",
          stars: 5,
          userId: 7,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect vacation rental. The house was comfortable, the surroundings were serene, and the host provided exceptional hospitality. Highly recommend!",
          stars: 4,
          userId: 7,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. A great experience!",
          stars: 4,
          userId: 7,
          spotId: 20,
        },
        {
          review:
            "Our stay at this spot was fantastic. The house was clean, spacious, and had all the necessary amenities. The host was friendly and accommodating. Highly recommended!",
          stars: 4,
          userId: 8,
          spotId: 11,
        },
        {
          review:
            "This spot exceeded our expectations. The interior was stylish, the views were breathtaking, and the host provided exceptional service. A truly memorable stay!",
          stars: 5,
          userId: 8,
          spotId: 12,
        },
        {
          review:
            "Had a wonderful time at this spot. The house was cozy, well-maintained, and had all the necessary amenities. The host was also responsive and friendly.",
          stars: 4,
          userId: 8,
          spotId: 13,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The location was perfect, the house was comfortable, and the host was welcoming. Highly recommend!",
          stars: 5,
          userId: 8,
          spotId: 14,
        },
        {
          review:
            "This spot was amazing! The property was stunning, the attention to detail was impeccable, and the host made us feel right at home. A+ experience!",
          stars: 5,
          userId: 8,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was outstanding. The house was luxurious, the amenities were top-notch, and the host provided excellent service. Highly recommended!",
          stars: 5,
          userId: 8,
          spotId: 16,
        },

        {
          review:
            "We had a pleasant stay at this spot. The host was accommodating and the property was clean and comfortable. Recommended!",
          stars: 3,
          userId: 4,
          spotId: 11,
        },
        {
          review:
            "Our experience at this spot was memorable. The house had a cozy atmosphere and the host provided helpful local recommendations. Enjoyed our stay!",
          stars: 4,
          userId: 4,
          spotId: 12,
        },
        {
          review:
            "Had a fantastic time at this spot. The interior was beautifully designed and the location was perfect for exploring the area. Highly recommended!",
          stars: 5,
          userId: 4,
          spotId: 13,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The house was spacious, well-maintained, and the host was friendly and responsive. Great experience overall!",
          stars: 5,
          userId: 4,
          spotId: 14,
        },
        {
          review:
            "This spot was a hidden gem! The host was welcoming, the property was immaculate, and the surrounding scenery was breathtaking. Highly recommend!",
          stars: 4,
          userId: 4,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was incredible. The house had everything we needed, the views were stunning, and the host was attentive to our needs. A+!",
          stars: 5,
          userId: 4,
          spotId: 16,
        },
        {
          review:
            "Had a great time at this spot. The location was convenient, the house was well-equipped, and the host was responsive and helpful. Recommended!",
          stars: 4,
          userId: 4,
          spotId: 17,
        },
        {
          review:
            "We had a wonderful stay at this spot. The house was clean, comfortable, and had all the amenities we needed. The host was friendly and accommodating.",
          stars: 5,
          userId: 4,
          spotId: 18,
        },
        {
          review:
            "This spot was perfect for our vacation. The house had a charming atmosphere, the location was ideal, and the host was gracious. Highly recommended!",
          stars: 4,
          userId: 4,
          spotId: 19,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was tastefully designed, the outdoor space was relaxing, and the host was attentive. A great experience!",
          stars: 4,
          userId: 4,
          spotId: 20,
        },

        {
          review:
            "Our stay at this spot was fantastic. The house was beautiful, the amenities were top-notch, and the host went above and beyond to ensure our comfort.",
          stars: 5,
          userId: 5,
          spotId: 11,
        },
        {
          review:
            "We had an amazing time at this spot. The location was perfect, the house was spacious and well-maintained, and the host was friendly and helpful. A+!",
          stars: 5,
          userId: 5,
          spotId: 12,
        },
        {
          review:
            "This spot exceeded our expectations. The interior was stylish and comfortable, the views were breathtaking, and the host provided excellent service. Highly recommend!",
          stars: 5,
          userId: 5,
          spotId: 13,
        },
        {
          review:
            "Had a lovely stay at this spot. The house was clean, cozy, and had all the necessary amenities. The host was also responsive and accommodating.",
          stars: 4,
          userId: 5,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The property was beautiful, the attention to detail was impeccable, and the host made us feel right at home. Highly recommend!",
          stars: 5,
          userId: 5,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was exceptional. The house was luxurious, the amenities were top-notch, and the host provided excellent service. A wonderful experience!",
          stars: 5,
          userId: 5,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 5,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was welcoming and accommodating. Recommended!",
          stars: 5,
          userId: 5,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect vacation rental. The house was comfortable, the surroundings were serene, and the host provided exceptional hospitality. Highly recommend!",
          stars: 4,
          userId: 5,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. A great experience!",
          stars: 4,
          userId: 5,
          spotId: 20,
        },

        {
          review:
            "Our stay at this spot was wonderful. The house was cozy, the location was peaceful, and the host was friendly and accommodating. Highly recommended!",
          stars: 4,
          userId: 6,
          spotId: 11,
        },
        {
          review:
            "This spot was a hidden gem! The interior was beautifully decorated, the amenities were top-notch, and the host made us feel right at home. A fantastic experience!",
          stars: 5,
          userId: 6,
          spotId: 12,
        },
        {
          review:
            "Had a fantastic time at this spot. The house was spacious, clean, and well-equipped. The host was also responsive and provided helpful local tips. Recommended!",
          stars: 4,
          userId: 6,
          spotId: 13,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The location was perfect, the house had a cozy atmosphere, and the host was friendly and accommodating. Great experience overall!",
          stars: 5,
          userId: 6,
          spotId: 14,
        },
        {
          review:
            "This spot exceeded our expectations. The interior was tastefully designed, the views were breathtaking, and the host provided exceptional service. Highly recommend!",
          stars: 5,
          userId: 6,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was amazing. The house was beautiful, the amenities were excellent, and the host went above and beyond to ensure our comfort. A+!",
          stars: 5,
          userId: 6,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 6,
          spotId: 17,
        },
        {
          review:
            "We had a wonderful stay at this spot. The house was comfortable, the location was ideal, and the host was welcoming and attentive. Highly recommended!",
          stars: 5,
          userId: 6,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect getaway for us. The house was cozy, the surroundings were peaceful, and the host provided exceptional hospitality. A great experience!",
          stars: 4,
          userId: 6,
          spotId: 19,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. Highly recommend!",
          stars: 4,
          userId: 6,
          spotId: 20,
        },

        {
          review:
            "We had a fantastic time at this spot. The house was clean, stylish, and well-equipped. The host was friendly, responsive, and provided great recommendations.",
          stars: 4,
          userId: 7,
          spotId: 11,
        },
        {
          review:
            "This spot was absolutely amazing. The interior was stunning, the amenities were top-notch, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 7,
          spotId: 12,
        },
        {
          review:
            "Our stay at this spot was incredible. The house had a cozy atmosphere, the views were breathtaking, and the host provided exceptional service. A perfect getaway!",
          stars: 5,
          userId: 7,
          spotId: 13,
        },
        {
          review:
            "Had a lovely time at this spot. The house was clean, comfortable, and had all the necessary amenities. The host was friendly and responsive. Recommended!",
          stars: 4,
          userId: 7,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The property was beautiful, the attention to detail was impeccable, and the host made us feel right at home. Highly recommend!",
          stars: 5,
          userId: 7,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was outstanding. The house was luxurious, the amenities were top-notch, and the host provided excellent service. Highly recommended!",
          stars: 5,
          userId: 7,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 7,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was welcoming and accommodating. Recommended!",
          stars: 5,
          userId: 7,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect vacation rental. The house was comfortable, the surroundings were serene, and the host provided exceptional hospitality. Highly recommend!",
          stars: 4,
          userId: 7,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. A great experience!",
          stars: 4,
          userId: 7,
          spotId: 20,
        },
        {
          review:
            "Our stay at this spot was fantastic. The house was clean, spacious, and had all the necessary amenities. The host was friendly and accommodating. Highly recommended!",
          stars: 4,
          userId: 8,
          spotId: 11,
        },
        {
          review:
            "This spot exceeded our expectations. The interior was stylish, the views were breathtaking, and the host provided exceptional service. A truly memorable stay!",
          stars: 5,
          userId: 8,
          spotId: 12,
        },
        {
          review:
            "Had a wonderful time at this spot. The house was cozy, well-maintained, and had all the necessary amenities. The host was also responsive and friendly.",
          stars: 4,
          userId: 8,
          spotId: 13,
        },
        {
          review:
            "We thoroughly enjoyed our stay at this spot. The location was perfect, the house was comfortable, and the host was welcoming. Highly recommend!",
          stars: 5,
          userId: 8,
          spotId: 14,
        },
        {
          review:
            "This spot was amazing! The property was stunning, the attention to detail was impeccable, and the host made us feel right at home. A+ experience!",
          stars: 5,
          userId: 8,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was exceptional. The house was luxurious, the amenities were top-notch, and the host provided excellent service. Highly recommended!",
          stars: 5,
          userId: 8,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 8,
          spotId: 17,
        },
        {
          review:
            "We had a wonderful stay at this spot. The house was comfortable, the location was ideal, and the host was welcoming and attentive. Highly recommended!",
          stars: 5,
          userId: 8,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect getaway for us. The house was cozy, the surroundings were peaceful, and the host provided exceptional hospitality. A great experience!",
          stars: 4,
          userId: 8,
          spotId: 19,
        },
        {
          review:
            "Had a memorable stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. Highly recommend!",
          stars: 4,
          userId: 8,
          spotId: 20,
        },

        {
          review:
            "We had a fantastic time at this spot. The house was clean, stylish, and well-equipped. The host was friendly, responsive, and provided great recommendations.",
          stars: 4,
          userId: 9,
          spotId: 11,
        },
        {
          review:
            "This spot was absolutely amazing. The interior was stunning, the amenities were top-notch, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 9,
          spotId: 12,
        },
        {
          review:
            "Our stay at this spot was incredible. The house had a cozy atmosphere, the views were breathtaking, and the host provided exceptional service. A perfect getaway!",
          stars: 5,
          userId: 9,
          spotId: 13,
        },
        {
          review:
            "Had a lovely time at this spot. The house was clean, comfortable, and had all the necessary amenities. The host was friendly and responsive. Recommended!",
          stars: 4,
          userId: 9,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The property was beautiful, the attention to detail was impeccable, and the host made us feel right at home. Highly recommend!",
          stars: 5,
          userId: 9,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was outstanding. The house was luxurious, the amenities were top-notch, and the host provided excellent service. Highly recommended!",
          stars: 5,
          userId: 9,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 9,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was welcoming and accommodating. Recommended!",
          stars: 5,
          userId: 9,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect vacation rental. The house was comfortable, the surroundings were serene, and the host provided exceptional hospitality. Highly recommend!",
          stars: 4,
          userId: 9,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. A great experience!",
          stars: 4,
          userId: 9,
          spotId: 20,
        },
        {
          review:
            "We had a fantastic time at this spot. The house was clean, stylish, and well-equipped. The host was friendly, responsive, and provided great recommendations.",
          stars: 4,
          userId: 10,
          spotId: 11,
        },
        {
          review:
            "This spot was absolutely amazing. The interior was stunning, the amenities were top-notch, and the host went above and beyond to ensure our comfort. Highly recommended!",
          stars: 5,
          userId: 10,
          spotId: 12,
        },
        {
          review:
            "Our stay at this spot was incredible. The house had a cozy atmosphere, the views were breathtaking, and the host provided exceptional service. A perfect getaway!",
          stars: 5,
          userId: 10,
          spotId: 13,
        },
        {
          review:
            "Had a lovely time at this spot. The house was clean, comfortable, and had all the necessary amenities. The host was friendly and responsive. Recommended!",
          stars: 4,
          userId: 10,
          spotId: 14,
        },
        {
          review:
            "We were blown away by this spot! The property was beautiful, the attention to detail was impeccable, and the host made us feel right at home. Highly recommend!",
          stars: 5,
          userId: 10,
          spotId: 15,
        },
        {
          review:
            "Our stay at this spot was outstanding. The house was luxurious, the amenities were top-notch, and the host provided excellent service. Highly recommended!",
          stars: 5,
          userId: 10,
          spotId: 16,
        },
        {
          review:
            "The spot was perfect for our needs. It was clean, spacious, and well-furnished. The host was friendly, helpful, and provided great local recommendations.",
          stars: 4,
          userId: 10,
          spotId: 17,
        },
        {
          review:
            "We had an amazing time at this spot. The location was ideal, the house had all the amenities we needed, and the host was welcoming and accommodating. Recommended!",
          stars: 5,
          userId: 10,
          spotId: 18,
        },
        {
          review:
            "This spot was the perfect vacation rental. The house was comfortable, the surroundings were serene, and the host provided exceptional hospitality. Highly recommend!",
          stars: 4,
          userId: 10,
          spotId: 19,
        },
        {
          review:
            "Had a delightful stay at this spot. The interior was beautifully designed, the outdoor area was inviting, and the host was attentive to our needs. A great experience!",
          stars: 4,
          userId: 10,
          spotId: 20,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
