import { ClientResponse, Cart, CustomerSignin, CustomerSignInResult, Order, OrderFromCartDraft, OrderState } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";
import { getCustomerByKey } from "./customer";

export const createCart = (customerKey: string): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}

export const createAnonymousCart = (): Promise<ClientResponse<Cart>> =>
    apiRoot
        .carts()
        .post({
            body: {
                currency: "EUR",
                country: "DE"
            }
        })
        .execute();

export const customerSignIn = (customerDetails: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> =>
    apiRoot
        .login()
        .post({
            body: customerDetails
        })
        .execute();

export const getCartById = (ID: string): Promise<ClientResponse<Cart>> =>
    apiRoot
        .carts()
        .withId({ ID })
        .get()
        .execute();

export const addLineItemsToCart = (cartId: string, arrayOfSKUs: Array<string>): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}

export const addDiscountCodeToCart = (cartId: string, discountCode: string): Promise<ClientResponse<Cart>> => {
    throw new Error("Function not implemented");
}

export const recalculate = (cartId: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId).then(cart =>
        apiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "recalculate",
                    }]
                }
            })
            .execute()
    );

export const setShippingMethod = async (cartId: string): Promise<ClientResponse<Cart>> => {

    const matchingShippingMethod = await apiRoot
        .shippingMethods()
        .matchingCart()
        .get({
            queryArgs: {
                cartId
            }
        })
        .execute()
        .then(response => response.body.results[0]);

    return getCartById(cartId).then(cart =>
        apiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "setShippingMethod",
                        shippingMethod: {
                            typeId: "shipping-method",
                            id: matchingShippingMethod.id
                        }
                    }]
                }
            })
            .execute()
    );

}


export const createOrderFromCart = (cartId: string): Promise<ClientResponse<Order>> => {
    throw new Error("Function not implemented");
}

const createOrderFromCartDraft = (cartId: string): Promise<OrderFromCartDraft> =>
    getCartById(cartId).then(cart => {
        return {
            id: cart.body.id,
            version: cart.body.version,
        };
    });

export const getOrderById = (ID: string): Promise<ClientResponse<Order>> =>
    apiRoot
        .orders()
        .withId({ ID })
        .get()
        .execute();

export const updateOrderCustomState = (orderId: string, customStateKey: string): Promise<ClientResponse<Order>> => {
    throw new Error("Function not implemented");
}

export const setOrderState = (orderId: string, stateName: OrderState): Promise<ClientResponse<Order>> => {
    throw new Error("Function not implemented");
}

export const addPaymentToCart = (cartId: string, paymentId: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart =>
            apiRoot
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cart.body.version,
                        actions: [{
                            action: "addPayment",
                            payment: {
                                typeId: "payment",
                                id: paymentId
                            }
                        }]
                    }
                })
                .execute()
        );

