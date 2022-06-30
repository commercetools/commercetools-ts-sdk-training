import { config } from "dotenv";

config();

export const enum Prefix {
    DEV = "DEV",
    IMPORT = "IMPORT",
    STORE = "BERLIN",
    ME = "ME",
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
}