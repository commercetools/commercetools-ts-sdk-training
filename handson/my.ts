import { Cart, ClientResponse, Customer, OrderPagedQueryResponse } from "@commercetools/platform-sdk";
import { apiRoot, myApiRoot, storeMyApiRoot } from "./client";

//TODO update client.ts file

export const getMe = (): Promise<ClientResponse<Customer>> =>
    myApiRoot
        .me()
        .get()
        .execute();

export const getMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> =>
    myApiRoot
        .me()
        .orders()
        .get()
        .execute();

export const createMyCart = (customerEmail: string): Promise<ClientResponse<Cart>> =>
    myApiRoot
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

export const getMyActiveCart = (): Promise<ClientResponse<Cart>> =>
    myApiRoot
        .me()
        .activeCart()
        .get()
        .execute();


// TODO in-store me endpoint

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