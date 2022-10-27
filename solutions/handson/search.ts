import { ClientResponse, ProductProjectionPagedQueryResponse, ProductProjectionPagedSearchResponse } from "@commercetools/platform-sdk";
import { pocApiRoot } from "./client";

export const getAllProducts = (): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> =>
    pocApiRoot
        .productProjections()
        .get()
        .execute();


export const simulateSearch = (searchParams: any): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> =>
    pocApiRoot
        .productProjections()
        .search()
        .get({
            queryArgs: {
                staged: searchParams.staged,
                markMatchingVariants: searchParams.markMatchingVariants,
                withTotal: searchParams.withTotal,
                "filter.query": searchParams["filter.query"],
                "filter.facets": searchParams["filter.facets"],
                facet: searchParams.facet,
                filter: searchParams.filter,
            },
        })
        .execute();

export const simulatePagination = async (perPage: number, where: string | undefined):
    Promise<ClientResponse<ProductProjectionPagedQueryResponse>> =>
    pocApiRoot
        .productProjections()
        .get({
            queryArgs: {
                where,
                limit: perPage,
                sort: "id asc",
            }
        })
        .execute();