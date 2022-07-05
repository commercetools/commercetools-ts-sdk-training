import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";


const createApiClient = () => {
    throw new Error("Function not implemented");
}

const createImportApiClient = () => {
    throw new Error("Function not implemented");
}

const createStoreApiClient = () => {
    throw new Error("Function not implemented");
}

const createMyApiClient = () => {
    throw new Error("Function not implemented");
}


export const apiRoot: ApiRoot = createApiClient();
// export const importApiRoot: ImportApiRoot = createImportApiClient();
// export const storeApiRoot: ApiRoot = createStoreApiClient();
// export const myApiRoot: ApiRoot = createMyApiClient();