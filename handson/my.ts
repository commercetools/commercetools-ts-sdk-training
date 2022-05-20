import { Cart, ClientResponse, Customer, OrderPagedQueryResponse } from "@commercetools/platform-sdk";
import { myApiRoot, storeMyApiRoot } from "./client";

//TODO update client.ts file

export const getMe = (): Promise<ClientResponse<Customer>> => {
    throw new Error("Function not implemented");
}

export const getMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> => {
    throw new Error("Function not implemented");
}

export const createMyCart = (customerEmail: string): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}

export const getMyActiveCart = (): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}

// TODO in-store me endpoint

export const getStoreMe = (): Promise<ClientResponse<Customer>> => {
    throw new Error("Function not implemented");
}

export const getStoreMyOrders = (): Promise<ClientResponse<OrderPagedQueryResponse>> => {
    throw new Error("Function not implemented");
}

export const createInStoreMyCart = (customerEmail: string): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}

export const getStoreMyActiveCart = (): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}
