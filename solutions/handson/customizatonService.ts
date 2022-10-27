import { ClientResponse, CustomObject, CustomObjectDraft, Type, TypeDraft, TypePagedQueryResponse } from "@commercetools/platform-sdk";
import { pocApiRoot } from "./client";

export const getCustomTypes = (): Promise<ClientResponse<TypePagedQueryResponse>> =>
    pocApiRoot
        .types()
        .get()
        .execute()

export const createCustomType = (typeDraft: TypeDraft): Promise<ClientResponse<Type>> =>
    pocApiRoot
        .types()
        .post({ body: typeDraft })
        .execute()

export const createCustomObject = (customObjectDraft: CustomObjectDraft): Promise<ClientResponse<CustomObject>> =>
    pocApiRoot
        .customObjects()
        .post({ body: customObjectDraft })
        .execute()


export const getCustomObjectByContainerAndKey = (container: string, key: string): Promise<ClientResponse<CustomObject>> =>
pocApiRoot
    .customObjects()
    .withContainerAndKey({
        container: container,
        key: key
    })
    .get()
    .execute()