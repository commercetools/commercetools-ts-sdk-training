import { CustomerSignin } from "@commercetools/platform-sdk";
import * as checkout from "./handson/order";
import { log } from "./utils/logger";
import * as quotes from "./handson/quotes"

const customerKey = "nd-customer";


const createQuoteProcessTest = async () => {

    let customerCart = await checkout.createCart(customerKey);

    customerCart = await checkout.addLineItemsToCart(customerCart.body.id, ['tulip-seed-box', 'tulip-seed-sack', 'tulip-seed-sack']);

    log("Cart: " + customerCart.body.id);

    let quoteRequest = await quotes.createQuoteRequest(customerCart.body.id);

    log("Quote Request: " + quoteRequest.body.id);

    let stagedQuote = await quotes.createStagedQuote(quoteRequest.body.id);

    stagedQuote = await quotes.setValidTo(stagedQuote.body.id,2);

    stagedQuote = await quotes.setSellerComment(stagedQuote.body.id,"Discount is added as requested");
    
    log("Staged Quote: " + stagedQuote.body.id);

    let quote = await quotes.createQuote(stagedQuote.body.id);

    log("Quote: " + quote.body.id);

    // stagedQuote = await quotes.changeStagedQuoteState(stagedQuote.body.id,"Sent");

    let order = await checkout.createOrderFromQuote(quote.body.id);

    return order.body;
};

createQuoteProcessTest()
    .then((order) => {
        log("Quote Request: " + order!.id);
        order!.lineItems.forEach(item => {
            log(item.variant.sku + " :" + item.quantity);
        });
    })
    .catch(log);
