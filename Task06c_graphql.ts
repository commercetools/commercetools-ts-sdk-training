import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";


const query = `
query {
    orders {
      results {
        customer {
          email
        }
        lineItems {
          nameAllLocales {
            value
          }
        }
        totalPrice {
          centAmount
        }
      }
    }
  }
  `;

apiRoot
  .graphql()
  .post({
    body: {
      query,
      variables: {}
    }
  })
  .execute()
  .then(log)
  .catch(log)