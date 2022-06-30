import { ClientResponse, ProductSelection, ProductSelectionProductPagedQueryResponse } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export const getProductSelectionByKey = (key: string): Promise<ClientResponse<ProductSelection>> => {
    throw new Error("Function not implemented");
}

export const createProductSelection = (key: string, name: string): Promise<ClientResponse<ProductSelection>> => {
    throw new Error("Function not implemented");
}

export const addProductsToProductSelection = async (
    productSelectionKey: string,
    arrayOfProductKeys: Array<string>
): Promise<ClientResponse<ProductSelection>> => {
    throw new Error("Function not implemented");
}

export const getProductsInProductSelection = (productSelectionKey: string): Promise<ClientResponse<ProductSelectionProductPagedQueryResponse>> => {
    throw new Error("Function not implemented");
}

