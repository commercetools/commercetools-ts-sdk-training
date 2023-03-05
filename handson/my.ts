import { ClientResponse, Customer, OrderPagedQueryResponse } from "@commercetools/platform-sdk";
import { myApiRoot } from "./client";

// TODO update client.ts file
// TODO: SPA api-client

export const getMe = (): Promise<ClientResponse<Customer>> => {
    return myApiRoot
        .me()
        .get()
        .execute();
}

export const getMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> => {
    return myApiRoot
        .me()
        .orders()
        .get()
        .execute();
}
