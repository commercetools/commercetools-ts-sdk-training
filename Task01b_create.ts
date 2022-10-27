import { CustomerDraft, CustomerGroupDraft } from "@commercetools/platform-sdk";
import {
    createCustomer,
    createCustomerGroup,
    getCustomerById,
    getCustomerByKey,
    createCustomerToken,
    confirmCustomerEmail,
    assignCustomerToCustomerGroup,
} from "./handson/customer";
import { log } from "./utils/logger";

// // TODO Step 1: Create a customer group in handson/CustomerService.ts
const customerGroupDraft: CustomerGroupDraft = {
    key: "loyalbuyers-customer-group",
    groupName: "loyalbuyers"
};

createCustomerGroup(customerGroupDraft).then().then(log).catch(log);

// // TODO Step 2: Create a customer in handson/CustomerService.ts
const customerDraft: CustomerDraft = {
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.com",
    password: "password",
    key: "tt-customer",
    addresses: [
        {
            country: "DE",
            key: "tt-customer-address"
        }
    ],
    defaultBillingAddress: 0,
    defaultShippingAddress: 0
};

createCustomer(customerDraft).then().then(log).catch(log);

// getCustomerByKey(customerDraft.key!).then(log).catch(log);

// // TODO Step 3: verify customer's email
// getCustomerByKey(customerDraft.key!)
//     .then(createCustomerToken)
//     .then(confirmCustomerEmail)
//     .then(log)
//     .catch(log);

// // TODO Step 4: Assign customer to a customer group
// assignCustomerToCustomerGroup(customerDraft.key!, customerGroupDraft.key!)
//     .then(log)
//     .catch(log);
