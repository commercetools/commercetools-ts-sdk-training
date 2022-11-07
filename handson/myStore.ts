import { ClientResponse, Customer, OrderPagedQueryResponse, Cart } from "@commercetools/platform-sdk";
import { storeMyApiRoot } from "./client";

// TODO update client.ts file
// TODO in-store me api-client

export const getStoreMe = (): Promise<ClientResponse<Customer>> =>
    storeMyApiRoot
        .me()
        .get()
        .execute();

export const getStoreMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> =>
    storeMyApiRoot
        .me()
        .orders()
        .get()
        .execute();

export const createInStoreMyCart = (customerEmail: string): Promise<ClientResponse<Cart>> =>
    storeMyApiRoot
        .me()
        .carts()
        .post({
            body: {
                currency: "EUR",
                country: "DE",
                customerEmail
            }
        })
        .execute();

export const getStoreMyActiveCart = (): Promise<ClientResponse<Cart>> =>
    storeMyApiRoot
        .me()
        .activeCart()
        .get()
        .execute();