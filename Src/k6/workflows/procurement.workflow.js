import { getProcPlanningData } from "../apps/procurement/procurement_planning.page.js";
import { getOpenSOSummaryData, getOpenSODetailsData } from "../apps/procurement/material_coverage_for_open_sales.page.js";
import { getMaterialRequirementData, getMaterialRequirementDayWiseData } from "../apps/procurement/material_requirement.page.js";

export function procurementWorkflow(user) {

  // weight similar to @task(3)
  const r = Math.random();

  if (r < 0.75) {
    getOpenSOSummaryData(user);
    getOpenSODetailsData(user);
    getProcPlanningData(user);
    getMaterialRequirementData(user);
    getMaterialRequirementDayWiseData(user);
  }
}
