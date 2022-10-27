import type { default as FetchFunc } from "node-fetch";

declare global {
    const fetch: typeof FetchFunc;
}

declare module "chalk-animation"

export type { ByProjectKeyRequestBuilder as ApiRoot } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
export type { ByProjectKeyRequestBuilder as ImportApiRoot } from "@commercetools/importapi-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
