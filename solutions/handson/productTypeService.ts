import { ClientResponse, ProductType, ProductTypePagedQueryResponse } from "@commercetools/platform-sdk";
import { concApiRoot, pocApiRoot } from "./client";

export const getSourceProductTypes = async (): Promise<ClientResponse<ProductTypePagedQueryResponse>> =>
    concApiRoot
        .productTypes()
        .get()
        .execute();

export const getSourceProductType = async (key: string): Promise<ClientResponse<ProductType>> =>
    concApiRoot
        .productTypes()
        .withKey({key})
        .get()
        .execute();


export const getProductTypes = async (): Promise<ClientResponse<ProductTypePagedQueryResponse>> =>
    pocApiRoot
        .productTypes()
        .get()
        .execute();
    
export const transferProductType = async (productType: ProductType): Promise<ClientResponse<ProductType>> => 
    pocApiRoot
        .productTypes()
        .post({
            body: {
                key: productType.key,
                name: productType.name,
                description: productType.description,
                attributes: productType.attributes?.map(attribute => {
                        return {
                            name: attribute.name,
                            type: attribute.type,
                            isRequired: attribute.isRequired,
                            label: attribute.label,
                            attributeConstraint: attribute.attributeConstraint,
                            isSearchable: attribute.isSearchable,
                            inputTip: attribute.inputTip,
                            inputHint: attribute.inputHint
                        }
                    })
            }
        })
        .execute();