import {
    checkImportOperationStatusById,
    checkImportOperationsStatus,
    checkImportSummary,
    createImportContainer
} from "./handson/importService";
import { log } from "../utils/logger";

// TODO Step 1: Provide your container key
const containerKey = "tt-ImportContainer";

// TODO Step 2: Create an import container
createImportContainer(containerKey).then(log).catch(log);


// check import summary for your container
// checkImportSummary(containerKey).then(log).catch(log);

// check import operations for your container
// checkImportOperationsStatus(containerKey).then(operations =>
//     operations.body.results.forEach(operation =>
//         log(operation.id + " : " + operation.state)
//     )
// );

// Check the status of import operations by their Ids
// checkImportOperationStatusById("b17bde76-9536-4115-b4d7-d9c1a54194a0").then(log).catch(log);
// checkImportOperationStatusById("b0a5adb1-2b1d-40fc-94a4-64b240c11020").then(log).catch(log);

