import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

// TODO: Get project settings

apiRoot
    .get()
    .execute()
    .then(log)
    .catch(log);


// TODO: Get shipping method by id

// apiRoot
//     .shippingMethods()
//     .withId({ ID: "996fe73b-de00-4f3a-b9e1-1f1a3bbec5d3" })
//     .get()
//     .execute()
//     .then(log)
//     .catch(log);


// TODO: Get standard tax category by key

// apiRoot
//     .taxCategories()
//     .withKey({ key: "standard-tax-category" })
//     .get()
//     .execute()
//     .then(log)
//     .catch(log);

