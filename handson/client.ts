import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";


const createApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    } = readConfig(Prefix.DEV);

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret
        },
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey });
}

const createImportApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    } = readConfig(Prefix.IMPORT);

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret
        },
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    return createImportApiBuilderFromCtpClient(client)
        .withProjectKeyValue({ projectKey });
}

const createStoreApiClient = () => {
    throw new Error("Function not implemented");
}

const createMyApiClient = () => {
    throw new Error("Function not implemented");
}


export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
// export const storeApiRoot: ApiRoot = createStoreApiClient();
// export const myApiRoot: ApiRoot = createMyApiClient();