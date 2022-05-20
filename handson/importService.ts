import { ProductDraftImport, ProductDraftImportRequest, PriceImportRequest, ClientResponse, ImportContainer, ImportSummary, ImportOperationPagedResponse, ImportOperation, ImportResponse } from "@commercetools/importapi-sdk";
import csvtojsonV2 from "csvtojson";
import { importApiRoot } from "./client";

export const createImportContainer = (key: string): Promise<ClientResponse<ImportContainer>> => {
    throw new Error("Function not implemented")
}

export const checkImportSummary = (importContainerKey: string): Promise<ClientResponse<ImportSummary>> => {
    throw new Error("Function not implemented")
}

export const checkImportOperationsStatus = (importContainerKey: string): Promise<ClientResponse<ImportOperationPagedResponse>> => {
    throw new Error("Function not implemented")
}

export const checkImportOperationStatusById = (id: string): Promise<ClientResponse<ImportOperation>> => {
    throw new Error("Function not implemented")
}

export const importProducts = async (importContainerKey: string): Promise<ClientResponse<ImportResponse>> => {
    throw new Error("Function not implemented")
}

const createProductDraftImportRequest = async (): Promise<ProductDraftImportRequest> =>
({
    type: "product-draft",
    resources: await getProductDraftImportArray(),
});


const getProductDraftImportArray = async (): Promise<Array<ProductDraftImport>> => {

    const participantNamePrefix = "sfs";

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
                "en": product.description,
                "de": product.description
            },
            masterVariant: {
                sku: participantNamePrefix + "-" + product.inventoryId,
                key: participantNamePrefix + "-" + product.productName,
                prices: [
                    {
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

export const importPrices = async (importContainerKey: string): Promise<ClientResponse<ImportResponse>> =>
    importApiRoot
        .prices()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .post({
            body: createPriceImportRequest()
        })
        .execute();

const createPriceImportRequest = (): PriceImportRequest =>
({
    type: "price",
    resources: [
        {
            key: "sf-price-import-redWine-key",
            product: {
                typeId: "product",
                key: "sfs-RedWine"
            },
            "productVariant": {
                typeId: "product-variant",
                key: "sfs-RedWine"
            },
            value: {
                "type": "centPrecision",
                "currencyCode": "EUR",
                "centAmount": 3000
            },
        }
    ]
});