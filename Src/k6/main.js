// // export { options } from "./scenarios/procurement.scenario.js";
// // export { default } from "./scenarios/procurement.scenario.js";
// import { resolveSelection } from "./core/selector.js";
// import { executeSelectedAPIs } from "./core/executor.js";
// import { getUser } from "./lib/userPool.js";

// export const options = getScenarioOptions();

// export default function () {

//   const selection = resolveSelection(__ENV);

//   selection.warnings.forEach(w =>
//     console.warn(w)
//   );

//   const user = getUser();

//   executeSelectedAPIs(
//     selection.apis,
//     user,
//     __ENV.SCENARIO
//   );

// }


// Ensure all pages/workflows register themselves before we resolve selection
import "./core/loader.js";

import { resolveSelection } from "./core/selector.js";
import { executeSelectedAPIs } from "./core/executor.js";
import { getScenarioOptions } from "./core/scenarioResolver.js";
import { getUser } from "./lib/userPool.js";

export const options = getScenarioOptions();

export default function () {
  const selection = resolveSelection(__ENV);

  selection.warnings.forEach(w => console.warn(w));

  const user = getUser();

  executeSelectedAPIs(selection.apis, user, __ENV.SCENARIO, selection.workflow);
}
