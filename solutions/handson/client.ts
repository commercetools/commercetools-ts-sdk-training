import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, HttpMiddlewareOptions, ClientBuilder, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../../types/global";
import { Prefix, Config, readConfig } from "../../utils/config";


const createApiClient = (prefix: Prefix) => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    }: Config = readConfig(prefix);

    const authOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret
        },
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authOptions)
        .withHttpMiddleware(httpOptions)
        .build();

    return createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey });

}

const createImportApiClient = (prefix: Prefix) => {

    const {
        clientId,
        clientSecret,
        oauthHost,
        projectKey
    }: Config = readConfig(prefix);

    const authOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret
        },
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host: "https://import.europe-west1.gcp.commercetools.com",
        fetch
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authOptions)
        .withHttpMiddleware(httpOptions)
        .build();

    return createImportApiBuilderFromCtpClient(client)
        .withProjectKeyValue({ projectKey });
}

const createStoreApiClient = (prefix: Prefix) => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    }: Config = readConfig(prefix);

    const authOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret
        },
        host: oauthHost,
        projectKey,
        fetch
    };

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };

    const client = new ClientBuilder()
        .withClientCredentialsFlow(authOptions)
        .withHttpMiddleware(httpOptions)
        .build();

    return createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey });
}


export const pocApiRoot: ApiRoot = createApiClient(Prefix.POC);
export const concApiRoot: ApiRoot = createApiClient(Prefix.CONCEPT);
export const importApiRoot: ImportApiRoot = createImportApiClient(Prefix.IMPORT);
export const storeApiRoot: ApiRoot = createStoreApiClient(Prefix.STORE);