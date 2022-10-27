import { pocApiRoot } from "./client";
import { ClientResponse, Customer, CustomerDraft, CustomerGroup, CustomerGroupDraft, CustomerSignInResult, CustomerToken } from "@commercetools/platform-sdk";

export const getCustomerById = (ID: string): Promise<ClientResponse<Customer>> =>
    pocApiRoot
        .customers()
        .withId({ ID })
        .get()
        .execute();

export const getCustomerByKey = (key: string): Promise<ClientResponse<Customer>> =>
    pocApiRoot
        .customers()
        .withKey({ key })
        .get()
        .execute();


export const createCustomer = (customerDraft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> =>
    pocApiRoot
        .customers()
        .post({
            body: customerDraft
        })
        .execute();

export const createCustomerGroup = (customerGroupDraft: CustomerGroupDraft): Promise<ClientResponse<CustomerGroup>> =>
    pocApiRoot
        .customerGroups()
        .post({
            body: customerGroupDraft
        })
        .execute();

export const setCustomFieldValue = (customer: ClientResponse<Customer>, customFieldName: string, value: any): Promise<ClientResponse<Customer>> =>
    pocApiRoot
        .customers()
        .withId({ID: customer.body.id})
        .post({
            body: {
                    actions:[{
                        action: "setCustomField",
                        name: customFieldName,
                        value
                    }],
                    version: customer.body.version
                }
        })
        .execute();


export const createCustomerToken = (customer: ClientResponse<Customer>): Promise<ClientResponse<CustomerToken>> =>
    pocApiRoot
        .customers()
        .emailToken()
        .post({
            body: {
                id: customer.body.id,
                ttlMinutes: 60
            }
        })
        .execute();

export const confirmCustomerEmail = (token: ClientResponse<CustomerToken>): Promise<ClientResponse<Customer>> =>
    pocApiRoot
        .customers()
        .emailConfirm()
        .post({
            body: {
                tokenValue: token.body.value
            }
        })
        .execute();

export const assignCustomerToCustomerGroup = (
    customerKey: string,
    customerGroupKey: string
): Promise<ClientResponse<Customer>> =>
    getCustomerByKey(customerKey)
        .then(customer => pocApiRoot
            .customers()
            .withKey({ key: customerKey })
            .post({
                body: {
                    version: customer.body.version,
                    actions: [{
                        action: "setCustomerGroup",
                        customerGroup: {
                            typeId: "customer-group",
                            key: customerGroupKey
                        }
                    }]
                }
            })
            .execute()
        );
