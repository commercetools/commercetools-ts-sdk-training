const { projectKey, getCustomerById } = require("./client.js");

exports.handler = async (event) => {
    console.log("Incoming event for project", projectKey);

    const order = event?.resource?.obj;

    console.log("New order has arrived", order?.lastModifiedAt);
    console.log("Order:", JSON.stringify(order));

    const customerId = order?.customerId;
    console.log("CustomerId:", customerId);

    try {
        const customerFetched = await getCustomerById(customerId);
        console.log("Customer fetched:", JSON.stringify(customerFetched));

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
                };

        }
    } catch (e) {
        return {
            errors: [{
                code: "InvalidOperation",
                message: e.message || "An unexpected error occurred"
            }],
            responseType: "FailedValidation"
        };
    }
};
