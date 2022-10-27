import { ClientResponse, ProductType, ProductTypePagedQueryResponse } from "@commercetools/platform-sdk";
import { concApiRoot, pocApiRoot } from "./client";

export const getSourceProductTypes = async (): Promise<ClientResponse<ProductTypePagedQueryResponse>> =>
    concApiRoot
        .productTypes()
        .get()
        .execute();

export const getSourceProductType = async (key: string): Promise<ClientResponse<ProductType>> =>
    concApiRoot
        .productTypes()
        .withKey({key})
        .get()
        .execute();


export const getProductTypes = async (): Promise<ClientResponse<ProductTypePagedQueryResponse>> =>
    pocApiRoot
        .productTypes()
        .get()
        .execute();
    
export const transferProductType = async (productType: ProductType): Promise<ClientResponse<ProductType>> => {
    throw new Error("Function not implemented")
}