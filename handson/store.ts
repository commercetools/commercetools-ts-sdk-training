import { Cart, ClientResponse, Customer, CustomerPagedQueryResponse, ProductsInStorePagedQueryResponse, Store } from "@commercetools/platform-sdk";
import { apiRoot, storeApiRoot } from "./client";

//TODO: update client.ts file

export const getStoreByKey = (key: string): Promise<ClientResponse<Store>> => {
    return apiRoot
        .stores()
        .withKey({ key })
        .get()
        .execute();
}

export const getCustomersInStore = (storeKey: string): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
    return storeApiRoot
        .inStoreKeyWithStoreKeyValue({ storeKey })
        .customers()
        .get()
        .execute();
}

export const addProductSelectionToStore = (storeKey: string, productSelectionKey: string): Promise<ClientResponse<Store>> => {
    return getStoreByKey(storeKey)
        .then(store => apiRoot
            .stores()
            .withKey({ key: storeKey })
            .post({
                body: {
                    version: store.body.version,
                    actions: [{
                        action: "addProductSelection",
                        productSelection: {
                            key: productSelectionKey,
                            typeId: "product-selection"
                        },
                        active: true
                    }]
                }
            })
            .execute()
        );
}

export const getProductsInStore = (storeKey: string): Promise<ClientResponse<ProductsInStorePagedQueryResponse>> => {
    return apiRoot
        .inStoreKeyWithStoreKeyValue({ storeKey })
        .productSelectionAssignments()
        .get({
            queryArgs: {
                expand: ["product", "productSelection"]
            }
        })
        .execute();
}

export const createInStoreCart = (storeKey: string, customer: ClientResponse<Customer>): Promise<ClientResponse<Cart>> => {
    return storeApiRoot
        .inStoreKeyWithStoreKeyValue({ storeKey })
        .carts()
        .post({
            body: {
                currency: "EUR",
                country: "DE",
                customerId: customer.body.id,
                customerEmail: customer.body.email
            }
        })
        .execute();
}
