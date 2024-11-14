import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
    AuthMiddlewareOptions,
    ClientBuilder,
    HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, readConfig } from "../utils/config";

const createApiClient = () => {
    const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig(
        Prefix.DEV
    );

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
        },
        host: oauthHost,
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
    const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig(
        Prefix.IMPORT
    );

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
        },
        host: oauthHost,
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

    return createImportApiBuilderFromCtpClient(client).withProjectKeyValue({
        projectKey,
    });
};

const createStoreApiClient = () => {
    const { clientId, clientSecret, host, oauthHost, projectKey } = readConfig(
        Prefix.STORE
    );

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
        },
        host: oauthHost,
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


export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
