import { QuoteRequest, ClientResponse, StagedQuote, StagedQuoteState, Quote } from "@commercetools/platform-sdk";
import { getCartById } from "./order";
import { apiRoot } from "./client";


export const getQuoteRequestById = (ID: string):Promise<ClientResponse<QuoteRequest>> =>
    apiRoot.quoteRequests()
    .withId({ ID })
    .get()
    .execute()

export const getStagedQuoteById = (ID: string):Promise<ClientResponse<StagedQuote>> =>
    apiRoot.stagedQuotes()
    .withId({ ID })
    .get()
    .execute()

export const getQuoteById = (ID: string):Promise<ClientResponse<Quote>> =>
    apiRoot.quotes()
    .withId({ ID })
    .get()
    .execute()

export const createQuoteRequest = (cartId: string): Promise<ClientResponse<QuoteRequest>> =>
    getCartById(cartId).then(cart => 
            apiRoot.quoteRequests()
                .post({
                    body: {
                        cart: {id:cartId,typeId: "cart"},
                        cartVersion: cart.body.version,
                        comment: "I need 10% discount"
                    }
                })
                .execute()
        )

export const createStagedQuote = (quoteRequestId: string): Promise<ClientResponse<StagedQuote>> =>
    getQuoteRequestById(quoteRequestId).then(quoteRequest => 
            apiRoot.stagedQuotes()
                .post({
                    body: {
                        quoteRequest: {id:quoteRequestId,typeId:"quote-request"},
                        quoteRequestVersion: quoteRequest.body.version
                    }
                })
                .execute()
        )


export const setValidTo = (StagedQuoteId: string, days: number): Promise<ClientResponse<StagedQuote>> =>
    getStagedQuoteById(StagedQuoteId).then(stagedQuote => 
            apiRoot.stagedQuotes()
                .withId({ID: StagedQuoteId})
                .post({
                    body: {
                        actions: [{
                            action: "setValidTo",
                            validTo: new Date(Date.now() + days*1000*60*60*24).toISOString()
                        }],
                        version: stagedQuote.body.version
                    }
                })
                .execute()
        )

export const setSellerComment = (StagedQuoteId: string, commment: string): Promise<ClientResponse<StagedQuote>> =>
    getStagedQuoteById(StagedQuoteId).then(stagedQuote => 
            apiRoot.stagedQuotes()
                .withId({ID: StagedQuoteId})
                .post({
                    body: {
                        actions: [{
                            action: "setSellerComment",
                            sellerComment:commment
                        }],
                        version: stagedQuote.body.version
                    }
                })
                .execute()
        )

export const changeStagedQuoteState = (StagedQuoteId: string, state: StagedQuoteState): Promise<ClientResponse<StagedQuote>> =>
    getStagedQuoteById(StagedQuoteId).then(stagedQuote => 
            apiRoot.stagedQuotes()
                .withId({ID: StagedQuoteId})
                .post({
                    body: {
                        actions: [{
                            action: "changeStagedQuoteState",
                            stagedQuoteState: state
                        }],
                        version: stagedQuote.body.version
                    }
                })
                .execute()
        )


export const createQuote = (stagedQuoteId: string): Promise<ClientResponse<Quote>> =>
    getStagedQuoteById(stagedQuoteId).then(stagedQuote => 
            apiRoot.quotes()
                .post({
                    body: {
                        stagedQuote: {id:stagedQuoteId,typeId:"staged-quote"},
                        stagedQuoteVersion: stagedQuote.body.version
                    }
                })
                .execute()
        )