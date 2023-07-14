const isAvailable = (booking, bookedDates, res) => {
  const errorHandler = {
    message: "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {},
  };
  const bookingIdKey = Number(booking.bookingId);
  const requestedStart = new Date(booking.startDate).getTime();
  const requestedEnd = new Date(booking.endDate).getTime();

  for (let i = 0; i < bookedDates.length; i++) {
    let bookingId = bookedDates[i].id;
    let bookedStartDate = new Date(bookedDates[i].startDate).getTime();
    let bookedEndDate = new Date(bookedDates[i].endDate).getTime();

    if (requestedStart >= bookedStartDate && requestedStart <= bookedEndDate) {
      if (bookingId !== bookingIdKey) {
        errorHandler.errors.startDate = "Start date conflicts with an existing booking";
      }
    }
    if (requestedEnd >= bookedStartDate && requestedEnd <= bookedEndDate) {
      if (bookingId !== bookingIdKey) {
        errorHandler.errors.endDate = "End date conflicts with an existing booking";
      }
    }
    if (requestedStart < bookedStartDate && requestedEnd > bookedEndDate) {
      if (bookingId !== bookingIdKey) {
        errorHandler.errors.startDate = "Start date conflicts with an existing booking";
        errorHandler.errors.endDate = "End date conflicts with an existing booking";
      }
    }
  }
  if (Object.values(errorHandler.errors).length) {
    res.status(403).json(errorHandler);
    return false;
  } else return true;
};

const doesNotExist = (object) => {
  return {
    message: `${object} couldn't be found`,
  };
};

const hasPassed = (startDate, endDate, res) => {
  if (startDate) {
    if (new Date(startDate).getTime() <= new Date().getTime()) {
      res.status(400).json({
        message: "Bookings that have been started can't be deleted",
      });
      return true;
    }
  }
  if (endDate) {
    if (new Date(endDate).getTime() < new Date().getTime()) {
      res.status(400).json({
        message: "Past bookings can't be modified",
      });
      return true;
    }
  }
};


const getName = (acronym, isCountry) => {
  acronym = acronym.toUpperCase();

  const stateMap = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
  };

  const countryMap = {
    USA: 'United States',
    CA: 'Canada',
    MX: 'Mexico',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    ES: 'Spain',
    IT: 'Italy',
    JP: 'Japan',
    CN: 'China',
    IN: 'India',
    BR: 'Brazil',
    AU: 'Australia',
    RU: 'Russia',
    SA: 'Saudi Arabia',
    ZA: 'South Africa',
    AR: 'Argentina',
    CL: 'Chile',
    CO: 'Colombia',
    EG: 'Egypt',
    NG: 'Nigeria',
    KE: 'Kenya',
    PK: 'Pakistan',
    TR: 'Turkey',
    SE: 'Sweden',
    CH: 'Switzerland',
    NL: 'Netherlands',
    BE: 'Belgium',
    AT: 'Austria',
    PT: 'Portugal',
    GR: 'Greece',
    KR: 'South Korea',
    ID: 'Indonesia',
    TH: 'Thailand',
    VN: 'Vietnam',
    MY: 'Malaysia',
    SG: 'Singapore',
    PH: 'Philippines',
    NZ: 'New Zealand',
  };

  const map = isCountry ? countryMap : stateMap;

  return map[acronym] || null;
};

module.exports = {
  isAvailable,
  doesNotExist,
  hasPassed,
  getName
};
