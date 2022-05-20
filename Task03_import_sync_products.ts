import {
    checkImportOperationStatusById,
    checkImportOperationsStatus,
    checkImportSummary,
    createImportContainer,
    importProducts, importPrices
} from "./handson/importService";
import { log } from "./utils/logger";

const containerKey = "tt-ImportContainer";

// Create an import container
createImportContainer(containerKey).then(log).catch(log);

// import products
// importProducts(containerKey).then(log).catch(log);

// Import prices
// importPrices(containerKey).then(log).catch(log);

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

// https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:5.0.0 -s all
