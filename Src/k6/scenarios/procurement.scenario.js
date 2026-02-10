import { procurementWorkflow } from "../workflows/procurement.workflow.js";
import { getUser } from "../lib/userPool.js";

export const options = {
  scenarios: {
    procurement_load: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "10s", target: 5 },
        { duration: "10s", target: 10 },
        { duration: "10s", target: 0 },
      ],
    },
  },
};

export default function () {
  const user = getUser();
  procurementWorkflow(user);
}
