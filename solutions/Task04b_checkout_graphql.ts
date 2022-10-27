import { pocApiRoot } from "./handson/client";
import { getCustomerByKey, setCustomFieldValue } from "./handson/customer";
import { getCustomObjectByContainerAndKey } from "./handson/customizatonService";
import * as checkout from "./handson/order";
import { createPayment } from "./handson/payment";
import { log } from "../utils/logger";

const customerKey = "tt-customer";
const cartId = "a7cf6922-f8bf-4567-be7b-9321bea28105";
const customObjectContainer = "Schemas";
const customObjectKey = "bonusPointsCalculationSchema";
const customerBonusFieldName = "bonuspoints-custom-field";
const taxCategoryKey = "test-tax-category";
const query = `
    query ($cartId: String!, $customerKey: String!, $customObjectContainer: String!) {
        cart (id: $cartId) { totalPrice { currencyCode centAmount } }
        customer (key: $customerKey) { custom { customFieldsRaw { name value } } }
        customObjects (container: $customObjectContainer) { results { key value } }
        }
    `;

// TODO Step 1: Customer wants to create an order, get all data to update their bonus points
//
// getCustomerByKey(customerKey)
//     .then(log)
//     .catch(log);

// checkout.getCartById(cartId)
//     .then(log)
//     .catch(log);

// getCustomObjectByContainerAndKey(customObjectContainer, customObjectKey)
//     .then(log)
//     .catch(log);

// // Now, improve the query with GraphQL

// TODO Step 2: Fetch customer bonus points, cart value, bonus points calculation schema
// Single GraphQL query to fetch all the information you need to place an order



const placeOrder = async () => {
    var graphQLResponse =  await pocApiRoot.graphql() 
        .post({
            body: {
            query,
            variables: {cartId, customerKey, customObjectContainer}
            }
        })
        .execute();

    let customObject = graphQLResponse.body.data.customObjects.results[0].value;
    let cartTotal = graphQLResponse.body.data.cart.totalPrice.centAmount;
    let oldPoints = graphQLResponse.body.data.customer.custom.customFieldsRaw[0].value;
    
    let earnedPoints = await calculateBonusPoints(cartTotal, customObject);
    
    let order = await checkout.getCartById(cartId)
    .then(cart => checkout.addCustomLineItemToCart(
        cartId,
        "Bonus points earned " + earnedPoints, 
        0,
        "bonus-points-custom-line-item",
        taxCategoryKey
        )
    )
    .then(checkout.createOrderFromCart);

    let customer = await getCustomerByKey(customerKey)
        .then(customer => setCustomFieldValue(customer,customerBonusFieldName, oldPoints + earnedPoints));

    if (order) {
        return {
            status: 201,
            message: "Order created: " + order.body.id + " and customer earned " + earnedPoints +" points."
        };
    }
};

placeOrder().then(log).catch(log);


const calculateBonusPoints = async (
    cartTotal: number,
    customObject: any
): Promise<number> => {
    let earnedPoints = 0;
    Object.entries(customObject).forEach(block =>{
        let { minCartValue, maxCartValue, factor, addon } = block[1] as cartValues;
        if(cartTotal >= minCartValue && cartTotal <= maxCartValue){
            earnedPoints = (cartTotal/100) * factor + addon;
        }
    })
    return earnedPoints;
}

export interface cartValues {
    minCartValue: number; maxCartValue: number; factor: number; addon: number;
}