const request = require("supertest");
const Users = require("./users");

let getAccessToken = () => {
  return request("http://localhost:3000/api")
    .post("/login")
    .send({ username: Users.username, password: Users.password })
    .set("Accept", "application/json")
    .then((response) => response.body.accessToken);
};

module.exports = { getAccessToken };
