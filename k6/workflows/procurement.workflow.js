import { getProcPlanningData } from "../apps/procurement/procurement_planning.page.js";

export function procurementWorkflow(user) {

  // weight similar to @task(3)
  const r = Math.random();

  if (r < 0.75) {
    getProcPlanningData(user);
  }
}
