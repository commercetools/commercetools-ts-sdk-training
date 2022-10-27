import { ProductDraftImport, 
    ProductDraftImportRequest, 
    PriceImportRequest, 
    ClientResponse, 
    ImportContainer, 
    ImportSummary, 
    ImportOperationPagedResponse, 
    ImportOperation, 
    ImportResponse } from "@commercetools/importapi-sdk";
import { Product, ProductPagedQueryResponse } from "@commercetools/platform-sdk";
import { importApiRoot } from "./client";

export const createImportContainer = (key: string): Promise<ClientResponse<ImportContainer>> =>
    importApiRoot
        .importContainers()
        .post({
            body: {
                key
            }
        })
        .execute();

export const checkImportSummary = (importContainerKey: string): Promise<ClientResponse<ImportSummary>> =>
    importApiRoot
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .importSummaries()
        .get()
        .execute();


export const checkImportOperationsStatus = (importContainerKey: string): Promise<ClientResponse<ImportOperationPagedResponse>> =>
    importApiRoot
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .importOperations()
        .get()
        .execute();

export const checkImportOperationStatusById = (id: string): Promise<ClientResponse<ImportOperation>> =>
    importApiRoot
        .importOperations()
        .withIdValue({ id })
        .get()
        .execute();

export const importProducts = async (importContainerKey: string, products: ClientResponse<ProductPagedQueryResponse>): Promise<ClientResponse<ImportResponse>> =>
    importApiRoot
        .productDrafts()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey })
        .post({
            body: await createProductDraftImportRequest(products.body.results)
        })
        .execute();


const createProductDraftImportRequest = async (products: Product[]): Promise<ProductDraftImportRequest> =>
({
    type: "product-draft",
    resources: await getProductDraftImportArray(products),
});


const getProductDraftImportArray = async (products: Product[]): Promise<Array<ProductDraftImport>> => {
    
    interface ProductData {
        [key: string]: any
    }
    const productToProductDraftImport = (product: ProductData): ProductDraftImport =>
        ({
            key: product.key,
            name: product.masterData.staged.name,
            slug: product.masterData.staged.slug,
            productType: {
                key: product.productType.obj.key,
                typeId: "product-type"
            },
            taxCategory: {
                key: product.taxCategory.obj.key,
                typeId: "tax-category"
            },
            masterVariant: {
                sku: product.masterData.staged.masterVariant.sku,
                prices: product.masterData.staged.masterVariant.prices.map((price: { country: any; value: { currencyCode: any; centAmount: any; type: any; }; }) => ({
                    country: price.country,
                    value: {
                        currencyCode: price.value.currencyCode,
                        centAmount: price.value.centAmount,
                        type: price.value.type
                    }
                })),
                key: product.masterData.staged.masterVariant.key,
                attributes: product.masterData.staged.masterVariant.attributes
            },
            variants: product.masterData.staged.variants.map((sourceVariant: { sku: any; prices: any; key: any; attributes: any; }) => ({
                sku: sourceVariant.sku,
                prices: sourceVariant.prices,
                key: sourceVariant.key,
                attributes: sourceVariant.attributes
            }))
        })
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
            key: "tt-redrose-price-import",
            product: {
                typeId: "product",
                key: "red-rose-flowers-product"
            },
            "productVariant": {
                typeId: "product-variant",
                key: "red-rose-flowers-product-variant-sack"
            },
            value: {
                "type": "centPrecision",
                "currencyCode": "EUR",
                "centAmount": 3000
            },
        }
    ]
});