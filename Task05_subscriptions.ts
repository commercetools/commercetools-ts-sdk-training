import { SubscriptionDraft } from "@commercetools/platform-sdk";
import { pocApiRoot } from "./handson/client";
import { log } from "./utils/logger";
import { Prefix, readConfig } from "./utils/config";

// // TODO: Create a Topic/Queue in your cloud account
// // TODO: Create a subscription draft for customer changes
// key - String - Optional - User-specific unique identifier for the subscription
// destination - Destination - The Message Queue into which the notifications are to be sent
// Changes/Messages - Array of MessageSubscription/ChangeSubscription - Optional - The messages to be subscribed to.

const subscriptionDraft: SubscriptionDraft = {
    key: "subscriptionSample",
    destination: {
        type: "GoogleCloudPubSub",
        projectId: "ct-support",
        topic: "training-subscription-sample"
    },
    changes: [{
        resourceTypeId: "customer"
    }]
};


// const { clientId, clientSecret } = readConfig(Prefix.AWS);
// const subscriptionDraft: SubscriptionDraft = {
//     key: "subscriptionSample",
//     destination: {
//         type: "SQS",
//         queueUrl: "https://sqs.eu-central-1.amazonaws.com/349839637243/Training-Demo",
//         accessKey: clientId,
//         accessSecret: clientSecret,
//         region: "eu-central-1"
//     },
//     changes: [{
//         resourceTypeId: "customer"
//     }]
// };

// // TODO: Create the subscription
pocApiRoot
    .subscriptions()
    .post({ body: subscriptionDraft })
    .execute()
    .then(log)
    .catch(log);

// TODO: Create a serverless function that subscribes to your Queue/Topic 
// and sends an email to the customer
// sample code can be found in /extensions folder in this repo