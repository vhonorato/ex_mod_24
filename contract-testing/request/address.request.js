import "dotenv/config";
import axios from "axios";
import data from "../data/address.payload.json";

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`;
axios.defaults.baseURL = baseUrl;

export const addressesList = async () => {
  return await axios.post(`${baseUrl}/graphql`, data, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ5OTkyMjY3LCJleHAiOjE2NTAxNjUwNjd9.9y3REgJe33lQYaRtQEcJL9yeTtHE5R97KrdPzPLjvqM",
      "Content-Type": "application/json",
    },
  });
};
