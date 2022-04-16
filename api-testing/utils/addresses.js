const { faker } = require("@faker-js/faker");

class Addresses {
  static street = faker.address.streetName();
  static city = faker.address.city();
  static state = faker.address.stateAbbr();
  static zip = parseInt(faker.address.zipCode("######"));
}

module.exports = Addresses;
