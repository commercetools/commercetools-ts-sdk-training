import { apiRoot, storeApiRoot } from "./handson/client";
import { getStoreByKey, getCustomersInStore, createInStoreCart } from "./handson/store";
import { getCustomerByKey } from "./handson/customer";
import { log } from "./utils/logger";

const storeKey = "berlin-store";

// getStoreByKey(storeKey).then(log).catch(log);

// getCustomersInStore(storeKey)
//     .then(customers => {
//         log(customers.body.count);
//         customers.body.results.forEach(customer =>
//             log(customer.id)
//         )
//     })
//     .catch(log);

// getCustomerByKey("tt-customer")
//     .then(customer => {
//         createInStoreCart(storeKey, customer)
//             .then(log)
//             .catch(log);
//     })
//     .catch(log);

// const globalCustomerKey = "tt-customer";
// const localCustomerKey = "tt-local-customer";


// this should succeed
// A store-specific customer can create a cart in store-context
// getCustomerByKey(localCustomerKey)
//     .then(customer =>
//         apiRoot
//             .inStoreKeyWithStoreKeyValue({ storeKey })
//             .carts()
//             .post({
//                 body: {
//                     currency: "EUR",
//                     country: "DE",
//                     customerEmail: customer.body.email,
//                     customerId: customer.body.id,
//                 }
//             })
//             .execute()
//     )
//     .then(log)
//     .catch(log);

// this should fail
// A store-specific customer can not create a global cart
// getCustomerByKey(localCustomerKey)
//     .then(customer =>
//         apiRoot
//             .carts()
//             .post({
//                 body: {
//                     currency: "EUR",
//                     country: "DE",
//                     customerEmail: customer.body.email,
//                     customerId: customer.body.id,
//                 }
//             })
//             .execute()
//     )
//     .then(log)
//     .catch(log);


// this should succeed
// A store-specific customer can create a cart with a store scoped client
// getCustomerByKey(localCustomerKey)
//     .then(customer =>
//         storeApiRoot
//             .inStoreKeyWithStoreKeyValue({ storeKey })
//             .carts()
//             .post({
//                 body: {
//                     currency: "EUR",
//                     country: "DE",
//                     customerEmail: customer.body.email,
//                     customerId: customer.body.id,
//                 }
//             })
//             .execute()
//     )
//     .then(log)
//     .catch(log);

// this should succeed
// A global customer can create a store-specific cart with a store scoped client
// getCustomerByKey(globalCustomerKey)
//     .then(customer =>
//         storeApiRoot
//             .inStoreKeyWithStoreKeyValue({ storeKey })
//             .carts()
//             .post({
//                 body: {
//                     currency: "EUR",
//                     country: "DE",
//                     customerEmail: customer.body.email,
//                     customerId: customer.body.id,
//                 }
//             })
//             .execute()
//     )
//     .then(log)
//     .catch(log);


// this should fail
// no matter if the customer is store-specific or global, with
// a store scoped client, one can not create a global cart
// getCustomerByKey(globalCustomerKey)
//     .then(customer =>
//         storeApiRoot
//             .carts()
//             .post({
//                 body: {
//                     currency: "EUR",
//                     country: "DE",
//                     customerEmail: customer.body.email,
//                     customerId: customer.body.id,
//                 }
//             })
//             .execute()
//     )
//     .then(log)
//     .catch(log);