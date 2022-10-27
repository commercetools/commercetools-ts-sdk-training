import { SubscriptionDraft } from "@commercetools/platform-sdk";
import { pocApiRoot } from "./handson/client";
import { log } from "../utils/logger";
import { Prefix, readConfig } from "../utils/config";

// key - String - Optional - User-specific unique identifier for the subscription
// destination - Destination - The Message Queue into which the notifications are to be sent
// messages - Array of MessageSubscription/ChangeSubscription - Optional - The messages to be subscribed to.
// changes

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


pocApiRoot
    .subscriptions()
    .post({ body: subscriptionDraft })
    .execute()
    .then(log)
    .catch(log);
