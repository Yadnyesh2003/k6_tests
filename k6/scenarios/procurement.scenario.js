import { procurementWorkflow } from "../workflows/procurement.workflow.js";
import { getUser } from "../lib/userPool.js";

export const options = {
  scenarios: {
    procurement_load: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "30s", target: 20 },
        { duration: "2m", target: 50 },
        { duration: "30s", target: 0 },
      ],
    },
  },
};

export default function () {
  const user = getUser();
  procurementWorkflow(user);
}
