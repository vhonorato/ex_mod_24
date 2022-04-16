import "dotenv/config";
import { Verifier } from "@pact-foundation/pact";

describe("Pact customers verification", () => {
  it("should validate the customer pact", () => {
    const brokerOpts = {
      provider: "ebac-demo-store-server",
      providerBaseUrl: process.env.PROVIDER_URL,
      pactUrls: [
        "http://localhost:9292/pacts/provider/ebac-demo-store-server/consumer/ebac-demo-store-admin/latest",
      ],
      publishVerificationResult: true,
      providerVersion: "1.0.0",
    };
    return new Verifier(brokerOpts).verifyProvider();
  });
});
