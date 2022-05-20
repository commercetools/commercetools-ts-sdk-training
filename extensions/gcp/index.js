/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const { projectKey, getCustomerById } = require("./client.js");

exports.main = (req, res) => {
    console.log("incoming event for project", projectKey);

    const order = req.body.resource?.obj;

    console.log("new order has arrived");
    console.log("order:" + JSON.stringify(order));

    const customerId = order?.customerId;
    console.log("customerId:" + customerId);

    getCustomerById(customerId).then(customerFetched => {
        console.log("customerFetched" + JSON.stringify(customerFetched));

        const canPlaceOrders = customerFetched.body.custom?.fields?.["allowed-to-place-orders"];

        switch (canPlaceOrders) {
            case undefined:
            case true:
                console.log("Can place order or custom field not defined");
                res.status(200).send();
                break;
            case false:
                console.error("Customer can not place orders");
                const errors = [{
                    code: "InvalidOperation",
                    message: "Customer has been blocked from placing orders"
                }]
                res.status(400).send(errors);
                break;
        }

    }).catch(e => {
        console.error("Customer was not found or general error");
        const errors = [{
            code: "InvalidOperation",
            message: "Customer was not found"
        }]
        res.status(400).send(errors);
    });

};