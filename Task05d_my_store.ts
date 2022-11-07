import {
    getStoreMe,
    getStoreMyOrders,
    createInStoreMyCart,
    getStoreMyActiveCart
} from "./handson/myStore";
import { log } from "./utils/logger";

// TODO: Store-specific SPA api-client

const storeCustomerEmail = "test.berlin@test.com";

getStoreMe().then(log).catch(log);

// getStoreMyOrders().then(log).catch(log);

// createInStoreMyCart(storeCustomerEmail).then(log).catch(log);

// getStoreMyActiveCart().then(log).catch(log);
