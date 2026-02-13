import { procurementWorkflow } from "../workflows/procurement.workflow.js";
import { getUser } from "../lib/userPool.js";

export const options = {
  scenarios: {
    procurement_load: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "30s", target: 1 },
        { duration: "10s", target: 5 },
        { duration: "10s", target: 0 },
      ],
    },
    constant_scenario: {
      executor: "constant-vus",
        vus: 1,
        duration: "30s",
        startTime: '0s'
      },
  },
};

export default function () {
  const user = getUser();
  procurementWorkflow(user);
}
