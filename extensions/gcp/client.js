const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
const fetch = require("node-fetch");

require('dotenv').config();

const authHost = "https://auth.europe-west1.gcp.commercetools.com";
const host = "https://api.europe-west1.gcp.commercetools.com";

const projectKey = process.env.projectKey;
const clientId = process.env.adminClientId;
const clientSecret = process.env.adminClientSecret;

const getClient = () => {
  const authMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
        clientId,
        clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return client;

};

const apiRoot = createApiBuilderFromCtpClient(getClient());


const getCustomerById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID })
    .get()
    .execute();

module.exports.projectKey = projectKey;
module.exports.getCustomerById = getCustomerById;