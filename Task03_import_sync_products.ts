import {
    checkImportOperationStatusById,
    checkImportOperationsStatus,
    checkImportSummary,
    createImportContainer,
    importProductDrafts
} from "./handson/importService";
import { log } from "./utils/logger";

const containerKey = "tt-ImportContainer";

// Create an import container
// createImportContainer(containerKey).then(log).catch(log);

// import products
// importProductDrafts(containerKey).then(log).catch(log);

// check import summary for your container
// checkImportSummary(containerKey).then(log).catch(log);

// check import operations for your container
// checkImportOperationsStatus(containerKey).then(operations =>
//     operations.body.results.forEach(operation =>
//         log(operation.id + " : " + operation.state)
//     )
// );

// Check the status of import operations by their Ids
// checkImportOperationStatusById("589a31ff-8dfd-44c2-8b65-34e69d0baf73").then(log).catch(log);
// checkImportOperationStatusById("340ec151-ebd3-422a-97a8-e7625e85633a").then(log).catch(log);

// https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:5.0.0 -s all
