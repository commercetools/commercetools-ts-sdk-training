import {
    getMe,
    getMyOrders,
    createMyCart,
    getMyActiveCart,
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
