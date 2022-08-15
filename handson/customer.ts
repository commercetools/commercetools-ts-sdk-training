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
): Promise<ClientResponse<CustomerToken>> => {
  throw new Error("Function not implemented");
};

export const confirmCustomerEmail = (
  token: ClientResponse<CustomerToken>
): Promise<ClientResponse<Customer>> => {
  throw new Error("Function not implemented");
};

export const assignCustomerToCustomerGroup = (
  customerKey: string,
  customerGroupKey: string
): Promise<ClientResponse<Customer>> => {
  throw new Error("Function not implemented");
};
