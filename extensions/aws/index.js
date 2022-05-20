const { projectKey, getCustomerById } = require("./client.js");

exports.handler = async (event) => {
    console.log("incoming event for project", projectKey);

    const order = event?.resource?.obj;

    console.log("new order has arrived");
    console.log("order:" + JSON.stringify(order));

    const customerId = order?.customerId;
    console.log("customerId:" + customerId);

    try {
        const customerFetched = await getCustomerById(customerId);
        console.log("customerFetched" + JSON.stringify(customerFetched));

        const canPlaceOrders = customerFetched.body.custom?.fields?.["allowed-to-place-orders"];

        switch (canPlaceOrders) {
            case undefined:
            case true:
                return {
                    actions: [],
                    responseType: "UpdateRequest"
                };
            case false:
                return {
                    errors: [{
                        code: "InvalidOperation",
                        message: "Customer has been blocked from placing orders"
                    }],
                    responseType: "FailedValidation"
                }
        }
    } catch (e) {
        return {
            errors: [{
                code: "InvalidOperation",
                message: e.message
            }],
            responseType: "FailedOperation"
        }
    }

};
