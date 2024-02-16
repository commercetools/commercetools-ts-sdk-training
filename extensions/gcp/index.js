/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const functions = require('@google-cloud/functions-framework');
const { projectKey, getCustomerById } = require("./client.js")

functions.http('main', async (req, res) => {
  console.log("Incoming event for project", projectKey);

  const order = req.body?.resource?.obj;

  console.log("New order has arrived", order?.lastModifiedAt);
  console.log("Order:", JSON.stringify(order));

  const customerId = order?.customerId;
  console.log("CustomerId:", customerId);

  try {
    const customerFetched = await getCustomerById(customerId);
    console.log("customerFetched", JSON.stringify(customerFetched));

    const canPlaceOrders = customerFetched?.body?.custom?.fields?.["allowed-to-place-orders"];

    switch (canPlaceOrders) {
      case undefined:
      case true:
        console.log("Can place order or custom field not defined");
        return res.status(201).end();

      case false:
        console.log("Customer can not place orders");
        const errors = [{
          code: "InvalidOperation",
          message: "Customer has been blocked from placing orders"
        }]
        return res.status(400).json({ errors });
    }
  } catch (e) {
    console.error("Customer was not found or general error", e);
    const errors = [{
      code: "InvalidOperation",
      message: e.message || "An unexpected error occurred"
    }]
    return res.status(400).json({ errors });
  }

});