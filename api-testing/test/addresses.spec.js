const request = require("supertest");
const { getAccessToken } = require("../utils/request");
const Addresses = require("../utils/addresses");
const API_URL = process.env.API_URL;

describe("Addresses resource", () => {
  let token;
  let addressId;
  beforeAll(async () => (token = await getAccessToken()));

  it("(E2E) should create a new address", async () => {
    await request(API_URL)
      .post("/addresses")
      .send({
        address_1: Addresses.street,
        city: Addresses.city,
        state: Addresses.state,
        zip: Addresses.zip,
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.address_1).toBe(Addresses.street);
        addressId = response.body.id;
      });
  });

  it("(E2E) should list addresses", async () => {
    await request(API_URL)
      .get("/addresses")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it("(E2E) should delete a address", async () => {
    await request(API_URL)
      .delete(`/addresses/${addressId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(addressId);
      });
  });
});


