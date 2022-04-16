require("dotenv").config();

const publisher = require("@pact-foundation/pact-node");
const { resolve } = require("path");

const opts = {
  pactFilesOrDirs: [resolve(process.cwd(), "pacts/")],
  pactBroker: process.env.PACT_BROKER,
  tags: ["ebacTest"],
  consumerVersion: "1.0.0",
  enable_public_badge_access: true
};

publisher.publishPacts(opts).catch((err) => console.error(err));