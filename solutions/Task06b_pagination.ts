// import { PagedQueryResponse, Product, ProductPagedQueryResponse } from "@commercetools/platform-sdk";
import { getAllProducts, simulatePagination } from "./handson/search";
import { log } from "../utils/logger";

// UseCases
// Fetching ALL products

// getAllProducts().then(log).catch(log);

// Fetching ALL products of a certain type
// Fetching ALL orders
// Pagination of some entities BUT only ordered via id

const getPagedQueryResults = async () => {

    // Instead of using offset to get a page, ask for products being greater than the id of the
    // previous products in your project

    const PAGE_SIZE = 20; // How many products per page

    let lastId: string, where: string | undefined, seenlastPage: boolean;

    do {

        // Ask for next page of products
        const { results: products, count } = (await simulatePagination(PAGE_SIZE, where)).body;

        // Process/print products
        log("---- New Page ----");
        products.forEach(p => log(p.id));

        // Have we processed the last page of products
        seenlastPage = count < PAGE_SIZE;

        // In case this was not the last page, prepare new query predicate
        if (!seenlastPage) {
            lastId = products[products.length - 1].id;
            where = `id > "${lastId}"`;
        }

    } while (!seenlastPage)
}

getPagedQueryResults().catch(log);
