import { CustomerSignin } from "@commercetools/platform-sdk";
import * as checkout from "./handson/order";
import { log } from "./utils/logger";

const customerKey = "tt-customer";

const mergingProcessTest = async () => {
    let anonymousCart = await checkout.createAnonymousCart();

    let customerCart = await checkout.createCart(customerKey);

    anonymousCart = await checkout.addLineItemsToCart(anonymousCart.body.id, ['TULIPSEED02', 'TULIPSEED02', 'TULIPSEED02']);

    customerCart = await checkout.addLineItemsToCart(customerCart.body.id, ['TULIPSEED02', 'TULIPSEED03', 'TULIPSEED01']);

    log("Anonymous Cart: " + anonymousCart.body.id);
    log("Customer Cart: " + customerCart.body.id);

    const customerDetails: CustomerSignin = {
        email: "test@test.com",
        password: "password",
        anonymousCartId: anonymousCart.body.id,
        anonymousCartSignInMode: "MergeWithExistingCustomerCart", // try switching to UseAsNewActiveCustomerCart
    };

    let result = await checkout.customerSignIn(customerDetails);
    return result.body.cart;
};

mergingProcessTest()
    .then((cart) => {
        log("Active cart: " + cart!.id);
        cart!.lineItems.forEach(item => {
            log(item.variant.sku + " :" + item.quantity);
        });
    })
    .catch(log);
