import { ClientResponse, Customer, OrderPagedQueryResponse } from "@commercetools/platform-sdk";
import { myApiRoot } from "./client";

// TODO update client.ts file
// TODO: SPA api-client

export const getMe = (): Promise<ClientResponse<Customer>> => {
    throw new Error("Function not implemented");
}

export const getMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> => {
    throw new Error("Function not implemented");
}
