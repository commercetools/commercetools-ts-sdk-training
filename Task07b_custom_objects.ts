import { CustomObjectDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";

const customObjectDraft: CustomObjectDraft = {
    container: "compatibility-info",
    key: "tulip-seed-product",
    value: {
        IncompatibleProducts: ["basil-seed-product"],
        LeafletID: "leaflet_1234",
        Instructions: {
            Title: "Plant Handling",
            Distance: "2 meter",
            Watering: "heavy watering"
        }
    }

}

apiRoot
    .customObjects()
    .post({ body: customObjectDraft })
    .execute()
    .then(log)
    .catch(log);

// apiRoot
//     .customObjects()
//     .withContainerAndKey({
//         container: customObjectDraft.container,
//         key: customObjectDraft.key
//     })
//     .get()
//     .execute()
//     .then(log)
//     .catch(log);