import { CustomLineItemDraft } from "@commercetools/importapi-sdk";
import { ClientResponse, Cart, CustomerSignin, CustomerSignInResult, Order, OrderFromCartDraft, OrderState, OrderFromQuoteDraft, ShippingMethod, ShippingMethodPagedQueryResponse } from "@commercetools/platform-sdk";
import { pocApiRoot } from "./client";
import { getCustomerByKey } from "./customer";


export const createCart = (customerKey: string): Promise<ClientResponse<Cart>> =>
    getCustomerByKey(customerKey)
        .then(customer => pocApiRoot
            .carts()
            .post({
                body: {
                    currency: "EUR",
                    country: "DE",
                    customerId: customer.body.id,
                    customerEmail: customer.body.email,
                    shippingAddress: customer.body.addresses.find(address => address.id === customer.body.defaultShippingAddressId),
                    inventoryMode: "ReserveOnOrder",
                    deleteDaysAfterLastModification: 1
                }
            })
            .execute()
        );

export const createAnonymousCart = (): Promise<ClientResponse<Cart>> =>
    pocApiRoot
        .carts()
        .post({
            body: {
                currency: "EUR",
                country: "DE"
            }
        })
        .execute();


export const customerSignIn = (customerDetails: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> =>
    pocApiRoot
        .login()
        .post({
            body: customerDetails
        })
        .execute();

export const getCartById = (ID: string): Promise<ClientResponse<Cart>> =>
    pocApiRoot
        .carts()
        .withId({ ID })
        .get()
        .execute();

export const addLineItemsToCart = (cartId: string, arrayOfSKUs: Array<string>): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart => pocApiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: arrayOfSKUs.map(sku => {
                        return {
                            action: "addLineItem",
                            sku
                        }
                    })
                }
            })
            .execute()
        );

export const addCustomLineItemToCart = (cartId: string, name: string, centAmount: number, slug: string, taxCategoryKey: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart => pocApiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "addCustomLineItem",
                        name: {"EN": name},
                        money: {
                            centAmount,
                            currencyCode: "EUR"
                        },
                        slug,
                        taxCategory: {
                            typeId: "tax-category",
                            key: taxCategoryKey
                        },
                        quantity: 1
                    }]
                }
            })
            .execute()
        );
        
export const addDiscountCodeToCart = (cartId: string, discountCode: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart => pocApiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "addDiscountCode",
                        code: discountCode
                    }]
                }
            })
            .execute()
        );

export const addDirectDiscountToCart = (cartId: string, percent: number): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart => pocApiRoot
            .carts()
            .withId({ ID: cartId })
            .post({
                body: {
                    version: cart.body.version,
                    actions: [{
                        action: "setDirectDiscounts",
                        discounts: [
                            {
                                value: {
                                    type: "relative",
                                    permyriad: percent * 100,
                                },
                                target: {
                                    type: "lineItems",
                                    predicate: "1 = 1"
                                }
                            }
                        ]
                    }]
                }
            })
            .execute()
        );

export const recalculate = (cartId: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId).then(cart =>
        pocApiRoot
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

    const matchingShippingMethods = await pocApiRoot
        .shippingMethods()
        .matchingCart()
        .get({
            queryArgs: {
                cartId
            }
        })
        .execute()

    const matchingShippingMethod = matchingShippingMethods.body.results[0];

    return getCartById(cartId).then(cart =>
        pocApiRoot
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

export const createOrderFromCart = (cart: ClientResponse<Cart>): Promise<ClientResponse<Order>> =>
    pocApiRoot
        .orders()
        .post({
            body: {
                cart: {
                    typeId: "cart",
                    id: cart.body.id
                },
                version: cart.body.version
            }
        })
        .execute();

export const createOrderFromCartId = (cartId: string): Promise<ClientResponse<Order>> =>
    createOrderFromCartDraft(cartId).then(orderFromCartDraft =>
        pocApiRoot
            .orders()
            .post({
                body: orderFromCartDraft
            })
            .execute()
    );

const createOrderFromCartDraft = (cartId: string): Promise<OrderFromCartDraft> =>
    getCartById(cartId).then(cart => {
        return {
            cart: {
                  id: cartId,
                  typeId: "cart"
            },
            version: cart.body.version,
        };
    });

export const getOrderById = (ID: string): Promise<ClientResponse<Order>> =>
    pocApiRoot
        .orders()
        .withId({ ID })
        .get()
        .execute();

export const updateOrderCustomState = (orderId: string, customStateKey: string): Promise<ClientResponse<Order>> =>
    getOrderById(orderId)
        .then(order =>
            pocApiRoot
                .orders()
                .withId({ ID: orderId })
                .post({
                    body: {
                        version: order.body.version,
                        actions: [{
                            action: "transitionState",
                            state: {
                                typeId: "state",
                                key: customStateKey
                            }
                        }]
                    }
                })
                .execute()
        );

export const setOrderState = (orderId: string, stateName: OrderState): Promise<ClientResponse<Order>> => getOrderById(orderId)
    .then(order =>
        pocApiRoot
            .orders()
            .withId({ ID: orderId })
            .post({
                body: {
                    version: order.body.version,
                    actions: [{
                        action: "changeOrderState",
                        orderState: stateName
                    }]
                }
            })
            .execute()
    );

export const addPaymentToCart = (cartId: string, paymentId: string): Promise<ClientResponse<Cart>> =>
    getCartById(cartId)
        .then(cart =>
            pocApiRoot
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

