import { SubscriptionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";
import { Prefix, readConfig } from "./utils/config";

// key - String - Optional - User-specific unique identifier for the subscription
// destination - Destination - The Message Queue into which the notifications are to be sent
// messages - Array of MessageSubscription - Optional - The messages to be subscribed to.
// changes

const subscriptionDraft: SubscriptionDraft = {
    key: "subscriptionSample",
    destination: {
        type: "GoogleCloudPubSub",
        projectId: "ct-support",
        topic: "training-subscription-sample"
    },
    messages: [{
        resourceTypeId: "order",
        types: ["OrderCreated"]
    }]
}


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
//     messages: [{
//         resourceTypeId: "order",
//         types: ["OrderCreated"]
//     }]
// }


apiRoot
    .subscriptions()
    .post({ body: subscriptionDraft })
    .execute()
    .then(log)
    .catch(log);
