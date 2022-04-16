const request = require("supertest");
const API_URL = process.env.API_URL;

describe("Health resource", () => {
  it("(HealthCheck) should check the live health", async () => {
    await request(API_URL)
      .get("/_health/live")
      .then((response) => {
        expect(response.status).toBe(204);
      });
  });
  it("(HealthCheck) should check the ready health", async () => {
    await request(API_URL)
    .get("/_health/ready")
    .then((response) => {
      expect(response.status).toBe(204);
    });
  });
});
