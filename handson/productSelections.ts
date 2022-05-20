import { ClientResponse, ProductSelection, ProductSelectionProductPagedQueryResponse } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

//TODO Product Selections

export const getProductSelectionByKey = (key: string): Promise<ClientResponse<ProductSelection>> =>
    apiRoot
        .productSelections()
        .withKey({ key })
        .get()
        .execute();

export const createProductSelection = (key: string, name: string): Promise<ClientResponse<ProductSelection>> =>
    apiRoot
        .productSelections()
        .post({
            body: {
                key,
                name: {
                    "en": name
                }
            }
        })
        .execute();

export const addProductsToProductSelection = async (
    productSelectionKey: string,
    arrayOfProductKeys: Array<string>
): Promise<ClientResponse<ProductSelection>> =>
    getProductSelectionByKey(productSelectionKey)
        .then(productSelection =>
            apiRoot
                .productSelections()
                .withKey({ key: productSelectionKey })
                .post({
                    body: {
                        version: productSelection.body.version,
                        actions: arrayOfProductKeys.map(key => {
                            return {
                                action: "addProduct",
                                product: {
                                    typeId: "product",
                                    key
                                }
                            }
                        })
                    }
                })
                .execute()
        );


export const getProductsInProductSelection = (productSelectionKey: string):
    Promise<ClientResponse<ProductSelectionProductPagedQueryResponse>> =>
    apiRoot
        .productSelections()
        .withKey({ key: productSelectionKey })
        .products()
        .get({
            queryArgs: {
                expand: "product"
            }
        })
        .execute();
