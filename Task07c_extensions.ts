import { ExtensionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";
import { Prefix, readConfig } from "./utils/config";



const extensionDraft: ExtensionDraft = {
    key: "tt-order-checker",
    destination: {
        type: "HTTP",
        url: "https://europe-west3-ct-support.cloudfunctions.net/training-extensions-sample"
    },
    triggers: [{
        resourceTypeId: "order",
        actions: ["Create"]
    }]
}


// const { clientId, clientSecret } = readConfig(Prefix.AWS);
// const extensionDraft: ExtensionDraft = {
//     key: "tt-order-checker",
//     destination: {
//         type: "AWSLambda",
//         arn: "arn:aws:lambda:eu-central-1:349839637243:function:ct-training-demo",
//         accessKey: clientId,
//         accessSecret: clientSecret
//     },
//     triggers: [{
//         resourceTypeId: "order",
//         actions: ["Create"]
//     }]
// }

// apiRoot
//     .extensions()
//     .post({ body: extensionDraft })
//     .execute()
//     .then(log)
//     .catch(log);