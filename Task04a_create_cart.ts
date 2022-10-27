import * as checkout from "./handson/order";
import { createPayment } from "./handson/payment";
import { log } from "./utils/logger";

// TODO Step 1: Update customer key
const customerKey = "tt-customer";

// TODO Step 2: create a cart and add line items to it

const prepareCart = async () => {

    let customerCart = "";

    // if (customerCart) {
    //     return {
    //         status: 201,
    //         message: "Cart created: " + customerCart.body.id,
    //     };
    // }
};

prepareCart().then(log).catch(log);
