const request = require("supertest");
const { getAccessToken } = require("../utils/request");
const  Users  = require("../utils/users");
const API_URL = process.env.API_URL;

describe("Customers resource", () => {
  let token;
  let customerId;
  beforeAll(async () => (token = await getAccessToken()));

  it("should create a new customer", async () => {
    await request(API_URL)
      .post("/customers")
      .send({
        email: Users.email,
        firstName: Users.firstName,
        lastName: Users.lastName,
        phone: Users.phone,
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(Users.email);
        customerId = response.body.id;
      });
  });

  it("should list customers", async () => {
    await request(API_URL)
      .get("/customers")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it("should delete a customer", async () => {
    await request(API_URL)
      .delete(`/customers/${customerId}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(customerId);
      });
  });
});
