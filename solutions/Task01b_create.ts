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
import { log } from "../utils/logger";

const customerGroupDraft: CustomerGroupDraft = {
    key: "loyalbuyers-customer-group",
    groupName: "loyalbuyers"
};
// createCustomerGroup(customerGroupDraft).then().then(log).catch(log);

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

// createCustomer(customerDraft).then().then(log).catch(log);

// getCustomerByKey(customerDraft.key!).then(log).catch(log);

getCustomerByKey(customerDraft.key!)
    .then(createCustomerToken)
    .then(confirmCustomerEmail)
    .then(log)
    .catch(log);

// assignCustomerToCustomerGroup(customerDraft.key!, customerGroupDraft.key!)
//     .then(log)
//     .catch(log);
