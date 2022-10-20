import { CustomerSignin } from "@commercetools/platform-sdk";
import * as checkout from "./handson/order";
import { log } from "./utils/logger";
import * as quotes from "./handson/quotes"

const customerKey = "tt-customer";


const createQuoteProcessTest = async () => {
    // buyer prepares a cart with line items
    let customerCart = await checkout.createCart(customerKey);
    customerCart = await checkout.addLineItemsToCart(customerCart.body.id, ['tulip-seed-box']);
    log("Cart: " + customerCart.body.id);

    // buyer prepares a quote from the cart
    let quoteRequest = await quotes.createQuoteRequest(customerCart.body.id);
    log("Quote Request: " + quoteRequest.body.id);

    // seller creates a staged quote from the quote request
    let stagedQuote = await quotes.createStagedQuote(quoteRequest.body.id);
    stagedQuote = await quotes.setValidTo(stagedQuote.body.id, 2);

    // seller adds the requested discount to the quotation cart
    let quotationCartId = await quotes.getStagedQuoteById(stagedQuote.body.id).then(stagedQuote => stagedQuote.body.quotationCart.id);
    await checkout.addDirectDiscountToCart(quotationCartId, 10);

    // seller adds comments
    stagedQuote = await quotes.setSellerComment(stagedQuote.body.id,"Discount is added as requested");
    log("Staged Quote: " + stagedQuote.body.id);

    // seller prepares a quote to be sent to the buyer and changes the state of staged quote to "sent"
    let quote = await quotes.createQuote(stagedQuote.body.id);
    log("Quote: " + quote.body.id);

    stagedQuote = await quotes.changeStagedQuoteState(stagedQuote.body.id,"Sent");

    // buyer accepts the quote and an order is placed from the quote
    let order = await checkout.createOrderFromQuote(quote.body.id);

    return order.body;
};

createQuoteProcessTest()
    .then((order) => {
        log("Order placed with following items: " + order!.id);
        order!.lineItems.forEach(item => {
            log(item.variant.sku + " :" + item.quantity);
        });
    })
    .catch(log);
