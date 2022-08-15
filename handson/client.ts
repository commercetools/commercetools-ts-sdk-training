import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";

const createApiClient = () => {
  const { oauthHost, clientId, clientSecret, projectKey, host }: Config =
    readConfig(Prefix.DEV);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    credentials: {
      clientId,
      clientSecret,
    },
    projectKey,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

const createImportApiClient = () => {
  throw new Error("Function not implemented");
};

const createStoreApiClient = () => {
  throw new Error("Function not implemented");
};

const createMyApiClient = () => {
  throw new Error("Function not implemented");
};

export const apiRoot: ApiRoot = createApiClient();
// export const importApiRoot: ImportApiRoot = createImportApiClient();
// export const storeApiRoot: ApiRoot = createStoreApiClient();
// export const myApiRoot: ApiRoot = createMyApiClient();
