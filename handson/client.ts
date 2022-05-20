import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, HttpMiddlewareOptions, ClientBuilder, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot, StoreMyApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";


const createApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    }: Config = readConfig(Prefix.DEV);

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

const createImportApiClient = () => {

    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    }: Config = readConfig(Prefix.IMPORT);

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

    return createImportApiBuilderFromCtpClient(client)
        .withProjectKeyValue({ projectKey });
}

const createStoreApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey
    }: Config = readConfig(Prefix.STORE);

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

const createMyApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey,
        username,
        password
    }: Config = readConfig(Prefix.ME);

    const authOptions: PasswordAuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
            user: {
                username,
                password
            }
        },
        host: oauthHost,
        projectKey,
        fetch
    }

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };

    const client = new ClientBuilder()
        .withPasswordFlow(authOptions)
        .withHttpMiddleware(httpOptions)
        .build();

    return createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey });

}

const createStoreMyApiClient = () => {
    const {
        clientId,
        clientSecret,
        host,
        oauthHost,
        projectKey,
        storeKey,
        username,
        password
    }: Config = readConfig(Prefix.STORE_ME);

    const authOptions: PasswordAuthMiddlewareOptions = {
        credentials: {
            clientId,
            clientSecret,
            user: {
                username,
                password
            }
        },
        host: oauthHost,
        oauthUri: `/oauth/${projectKey}/in-store/key=${storeKey}/customers/token`,
        projectKey,
        fetch
    }

    const httpOptions: HttpMiddlewareOptions = {
        host,
        fetch
    };

    const client = new ClientBuilder()
        .withPasswordFlow(authOptions)
        .withHttpMiddleware(httpOptions)
        .build();

    return createApiBuilderFromCtpClient(client)
        .withProjectKey({ projectKey })
        .inStoreKeyWithStoreKeyValue({ storeKey });
}

export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
export const myApiRoot: ApiRoot = createMyApiClient();
export const storeMyApiRoot: StoreMyApiRoot = createStoreMyApiClient();