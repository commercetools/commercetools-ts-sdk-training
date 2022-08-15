import { apiRoot } from "./client";
import {
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerToken,
} from "@commercetools/platform-sdk";

export const getCustomerById = (
  ID: string
): Promise<ClientResponse<Customer>> =>
  apiRoot.customers().withId({ ID }).get().execute();

export const getCustomerByKey = (
  key: string
): Promise<ClientResponse<Customer>> =>
  apiRoot.customers().withKey({ key }).get().execute();

export const createCustomer = (
  customerDraft: CustomerDraft
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .customers()
    .post({
      body: customerDraft,
    })
    .execute();

export const createCustomerToken = (
  customer: ClientResponse<Customer>
): Promise<ClientResponse<CustomerToken>> =>
  apiRoot
    .customers()
    .emailToken()
    .post({
      body: {
        id: customer.body.id,
        ttlMinutes: 90,
      },
    })
    .execute();

export const confirmCustomerEmail = (
  token: ClientResponse<CustomerToken>
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .customers()
    .emailConfirm()
    .post({
      body: {
        tokenValue: token.body.value,
      },
    })
    .execute();

export const assignCustomerToCustomerGroup = (
  customerKey: string,
  customerGroupKey: string
): Promise<ClientResponse<Customer>> =>
  getCustomerByKey(customerKey).then((customer) =>
    apiRoot
      .customers()
      .withId({ ID: customer.body.id })
      .post({
        body: {
          version: customer.body.version,
          actions: [
            {
              action: "setCustomerGroup",
              customerGroup: {
                key: customerGroupKey,
                typeId: "customer-group",
              },
            },
            {
              action: "setMiddleName",
              middleName: "A F",
            },
          ],
        },
      })
      .execute()
  );
