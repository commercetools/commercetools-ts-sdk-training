import { CustomObjectDraft } from "@commercetools/platform-sdk";
import { log } from "./utils/logger";
import { createCustomObject, getCustomObjectByContainerAndKey } from "./handson/customizatonService";

// TODO Step 1: Design a structure for storing the following information
//  Cart value  - Bonus Points earned
//  0.01 - 10.00 USD - 1 point
//  10.01 - 100.00 USD - 1 point for each USD
//  above 100.00 USD - 2 points for each USD

// Possible solution (Discuss, all in one custom object, you can have it in 3, what about higher cart values)
//  MinCartValue / MaxCartValue / Factor / Addon
//  0.01 / 10 / 0 / 1
//  10.01 / 100 / 1 / 0
//  100.01 / 100000 / 2 / 0

// TODO Step 2: Create the custom object(s)
const bonusPointsCalculationSchemaObject: CustomObjectDraft = {
    container: "Schemas",
    key: "bonusPointsCalculationSchema",
    value: {
        "10001": {
            "minCartValue": 10001,
            "maxCartValue": 10000000,
            "factor": 2,
            "addon": 0
        },
        "1001":{
            "minCartValue": 1001,
            "maxCartValue": 10000,
            "factor": 1,
            "addon": 0,
        },  
        "1": {
            "minCartValue": 1,
            "maxCartValue": 1000,
            "factor": 0,
            "addon": 1
        }
    }
}

createCustomObject(bonusPointsCalculationSchemaObject)
    .then(log)
    .catch(log);

// getCustomObjectByContainerAndKey(bonusPointsCalculationSchemaObject.container,bonusPointsCalculationSchemaObject.key)
//     .then(log)
//     .catch(log);