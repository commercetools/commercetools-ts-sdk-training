import {
    getMe,
    getMyOrders,
    createMyCart,
    getMyActiveCart,
    getStoreMe,
    getStoreMyOrders,
    createInStoreMyCart,
    getStoreMyActiveCart
} from "./handson/my";
import { log } from "./utils/logger";

// getMe().then(log).catch(log);

// getMyOrders()
//     .then(orders =>
//         orders.body.results.forEach(order =>
//             log(order.id + " : " + order.totalPrice.centAmount)
//         )
//     )
//     .catch(log);

const customerEmail = "test@test.com";

// createMyCart(customerEmail).then(log).catch(log);

// getMyActiveCart().then(log).catch(log);


// TODO: Store-specific SPA api-client


const storeCustomerEmail = "test.berlin@test.com";

// getStoreMe().then(log).catch(log);

// getStoreMyOrders().then(log).catch(log);

// createInStoreMyCart(storeCustomerEmail).then(log).catch(log);

// getStoreMyActiveCart().then(log).catch(log);
