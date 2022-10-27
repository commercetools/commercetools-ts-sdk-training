import { config } from "dotenv";

config();

export const enum Prefix {
    POC = "POC",
    CONCEPT = "CONC_RO",
    IMPORT = "POC",
    STORE = "BERLIN",
    ME = "ME",
    STORE_ME = "BERLIN_ME",
    AWS = "AWS"
};

export const readConfig = (prefix: string) => {
    return {
        clientId: process.env[prefix + "_CLIENT_ID"] || "",
        clientSecret: process.env[prefix + "_CLIENT_SECRET"] || "",
        projectKey: process.env[prefix + "_PROJECT_KEY"] || "",
        oauthHost: process.env[prefix + "_AUTH_URL"] || "",
        host: process.env[prefix + "_API_URL"] || "",
        username: process.env[prefix + "_CUSTOMER_EMAIL"] || "",
        password: process.env[prefix + "_CUSTOMER_PASSWORD"] || "",
        storeKey: process.env[prefix + "_STORE_KEY"] || ""
    };
}

export type Config = {
    clientId: string;
    clientSecret: string;
    projectKey: string;
    oauthHost: string;
    host: string;
    username?: string;
    password?: string;
    storeKey?: string;
}