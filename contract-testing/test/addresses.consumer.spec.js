import "dotenv/config";
import { Pact } from "@pact-foundation/pact";
import { resolve } from "path";
import {
  eachLike,
  somethingLike,
} from "@pact-foundation/pact/src/dsl/matchers";
import { addressesList } from "../request/address.request";

const mockProvider = new Pact({
  consumer: "ebac-demo-store-admin",
  provider: "ebac-demo-store-server",
  port: parseInt(process.env.MOCK_PORT),
  log: resolve(process.cwd(), "logs", "pact.log"),
  dir: resolve(process.cwd(), "pacts"),
});

describe("Addresses consumer Test", () => {
  beforeAll(async () => {
    await mockProvider.setup().then(() => {
      mockProvider.addInteraction({
        uponReceiving: "a request",
        withRequest: {
          method: "POST",
          path: "/graphql",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ5OTkyMjY3LCJleHAiOjE2NTAxNjUwNjd9.9y3REgJe33lQYaRtQEcJL9yeTtHE5R97KrdPzPLjvqM",
            "Content-Type": "application/json",
          },
          body: {
            operationName: "addresses",
            variables: {
              where: {},
              take: 50,
              skip: 0,
              orderBy: {
                id: "Asc",
              },
            },
            query:
              "query addresses($where: AddressWhereInput, $orderBy: AddressOrderByInput, $skip: Float, $take: Float) {\n  items: addresses(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    address_1\n    address_2\n    city\n    createdAt\n    id\n    state\n    updatedAt\n    zip\n    customers {\n      id\n      __typename\n    }\n    __typename\n  }\n  total: _addressesMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    count\n    __typename\n  }\n}\n",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: {
            data: {
              items: eachLike(
                {
                  address_1: somethingLike("Rua Cruz Jobim"),
                  address_2: null,
                  city: somethingLike("São Paulo"),
                  createdAt: somethingLike("2022-04-15T20:29:46.889Z"),
                  id: somethingLike("cl20vwbns0236p8uh5ebix9tb"),
                  state: somethingLike("SP"),
                  updatedAt: somethingLike("2022-04-15T20:29:46.889Z"),
                  zip: somethingLike(3435060),
                  customers: [
                    {
                      id: "cl20vxbo50304p8uhrz01kxhu",
                      __typename: somethingLike("Customer"),
                    },
                  ],
                  __typename: "Address",
                },
                { min: 2 }
              ),
              total: {
                count: "2",
                __typename: "MetaQueryPayload",
              },
            },
          },
        },
      });
    });
  });

  afterAll(() => mockProvider.finalize());
  afterEach(() => mockProvider.verify());

  it("should return address list", () => {
    addressesList().then((response) => {
      const { address_1, zip } = response.data.data.items[0];

      expect(response.status).toEqual(200);
      expect(address_1).toBe("Rua Cruz Jobim");
      expect(zip).toBe(3435060);
    });
  });
});
