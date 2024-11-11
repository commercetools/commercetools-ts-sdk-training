import {
    ProductDraftImport,
    ProductDraftImportRequest,
    ClientResponse,
    ImportContainer,
    ImportSummary,
    ImportOperationPagedResponse,
    ImportOperation,
    ImportResponse
} from "@commercetools/importapi-sdk";
import csvtojsonV2 from "csvtojson";
import { importApiRoot } from "./client";


export const createImportContainer = (key: string): Promise<ClientResponse<ImportContainer>> => {
    return importApiRoot
        .importContainers()
        .post({
            body: {
                key
            }
        })
        .execute();
}

export const checkImportSummary = (importContainerKey: string): Promise<ClientResponse<ImportSummary>> => {
    return importApiRoot
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .importSummaries()
        .get()
        .execute();
}

export const checkImportOperationsStatus = (importContainerKey: string): Promise<ClientResponse<ImportOperationPagedResponse>> => {
    return importApiRoot
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .importOperations()
        .get({
            queryArgs: {
                debug: true
            }
        })
        .execute();
}

export const checkImportOperationStatusById = (id: string): Promise<ClientResponse<ImportOperation>> => {
    return importApiRoot
        .importOperations()
        .withIdValue({ id })
        .get()
        .execute();
}

export const importProductDrafts = async (importContainerKey: string): Promise<ClientResponse<ImportResponse>> => {
    return importApiRoot
        .productDrafts()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .post({
            body: await createProductDraftImportRequest()
        })
        .execute();
}

const createProductDraftImportRequest = async (): Promise<ProductDraftImportRequest> =>
({
    type: "product-draft",
    resources: await getProductDraftImportArray(),
});


const getProductDraftImportArray = async (): Promise<Array<ProductDraftImport>> => {

    const participantNamePrefix = "tt";

    // Get products data from csv
    const products = await csvtojsonV2()
        .fromFile("./products.csv");

    interface ProductData {
        [key: string]: string
    }

    const productToProductDraftImport = (product: ProductData): ProductDraftImport => {
        return {
            key: participantNamePrefix + "-" + product.productName,
            name: {
                "en": product.productName,
                "de": product.productName
            },
            productType: {
                typeId: "product-type",
                key: product.productType
            },
            slug: {
                "en": participantNamePrefix + "-" + product.productName,
                "de": participantNamePrefix + "-" + product.productName
            },
            description: {
                "en": product.productDescription,
                "de": product.productDescription
            },
            masterVariant: {
                sku: participantNamePrefix + "-" + product.inventoryId,
                key: participantNamePrefix + "-" + product.productName,
                prices: [
                    {
                        key: "price1",
                        value: {
                            type: "centPrecision",
                            currencyCode: product.currencyCode,
                            centAmount: parseInt(product.basePrice, 10)
                        }
                    }
                ],
                images: [
                    {
                        url: product.imageUrl,
                        dimensions: { w: 177, h: 237 }
                    }
                ]
            }
        };
    }

    return products.map(productToProductDraftImport);
}
