import "dotenv/config";
import { Pact } from "@pact-foundation/pact";
import { resolve } from "path";
import {
  eachLike,
  somethingLike,
} from "@pact-foundation/pact/src/dsl/matchers";
import { customerList } from "../request/customer.request";

const mockProvider = new Pact({
  consumer: "ebac-demo-store-admin",
  provider: "ebac-demo-store-server",
  port: parseInt(process.env.MOCK_PORT),
  log: resolve(process.cwd(), "logs", "pact.log"),
  dir: resolve(process.cwd(), "pacts"),
});

describe("Customers consumer Test", () => {
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
            operationName: "customers",
            variables: {
              where: {},
              take: 50,
              skip: 0,
              orderBy: {
                id: "Asc",
              },
            },
            query:
              "query customers($where: CustomerWhereInput, $orderBy: CustomerOrderByInput, $skip: Float, $take: Float) {\n  items: customers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    createdAt\n    email\n    firstName\n    id\n    lastName\n    phone\n    updatedAt\n    orders {\n      id\n      __typename\n    }\n    address {\n      id\n      __typename\n    }\n    __typename\n  }\n  total: _customersMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {\n    count\n    __typename\n  }\n}\n",
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
                  createdAt: somethingLike("2022-04-15T20:30:33.558Z"),
                  email: somethingLike("v.honorato@live.com"),
                  firstName: somethingLike("Vinicius"),
                  id: somethingLike("cl20vxbo50304p8uhrz01kxhu"),
                  lastName: somethingLike("Honorato"),
                  phone: somethingLike("+5511945348422"),
                  updatedAt: somethingLike("2022-04-15T20:30:33.558Z"),
                  orders: [],
                  address: {
                    id: "cl20vwbns0236p8uh5ebix9tb",
                    __typename: "Address",
                  },
                  __typename: somethingLike("Customer"),
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

  it("should return customers list", () => {
    customerList().then((response)  =>  {
      const { firstName, email } = response.data.data.items[0];

      expect(response.status).toEqual(200);
      expect(firstName).toBe("Vinicius");
      expect(email).toBe("v.honorato@live.com");
    });
  });
});
