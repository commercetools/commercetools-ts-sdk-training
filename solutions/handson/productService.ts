import { ClientResponse, Product, ProductDraft, ProductPagedQueryResponse } from "@commercetools/platform-sdk";
import { concApiRoot, pocApiRoot } from "./client";

export const getSourceProducts = async (): Promise<ClientResponse<ProductPagedQueryResponse>> =>
    concApiRoot
        .products()
        .get({
            queryArgs:{
                expand: ["productType","taxCategory"]                
            }
        })
        .execute();

export const getSourceProduct = async (key: string): Promise<ClientResponse<Product>> =>
    concApiRoot
        .products()
        .withKey({key})
        .get()
        .execute();


export const getProducts = async (): Promise<ClientResponse<ProductPagedQueryResponse>> =>
    pocApiRoot
        .products()
        .get()
        .execute();
    
export const importProductDrafts = async (productDraft: ProductDraft): Promise<ClientResponse<Product>> => 
    pocApiRoot
        .products()
        .post({
            body: productDraft
        })
        .execute();