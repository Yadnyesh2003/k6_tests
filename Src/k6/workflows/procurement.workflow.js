// import { getProcPlanningData, getProdDataAfterSimulation, updateProcurementPlanningSimulatedQty } from "../apps/procurement/procurement_planning.page.js";
// import { getOpenSOSummaryData, getOpenSODetailsData } from "../apps/procurement/material_coverage_for_open_sales.page.js";
// import { getMaterialRequirementData, getMaterialRequirementDayWiseData } from "../apps/procurement/material_requirement.page.js";
// import { getDayWiseCoverageData } from "../apps/procurement/day_wise_coverage.page.js";
// import { getRMPMCoverageData } from "../apps/procurement/rm_pm_orderwise_coverage.page.js";
// import { getRMPMBufferTrendData } from "../apps/procurement/rm_pm_buffer_trends.page.js";
// import { getExpiditingRMData } from "../apps/procurement/expiditing_rm_suppliers.page.js";

// export function procurementWorkflow(user) {

//   // weight similar to @task(3)
//   const r = Math.random();

//   if (r < 0.75) {
//     getOpenSOSummaryData(user);
//     getOpenSODetailsData(user);
//     getProcPlanningData(user);
//     updateProcurementPlanningSimulatedQty(user);
//     getProdDataAfterSimulation(user);
//     getMaterialRequirementData(user);
//     getMaterialRequirementDayWiseData(user);
//     getDayWiseCoverageData(user);
//     getRMPMCoverageData(user);
//     getRMPMBufferTrendData(user);
//     getExpiditingRMData(user);
//   }
// }



import { getApi, registerWorkflow } from "../core/registry.js";

export function procurementWorkflow(user) {

  const getMaterialRequirementData =
    getApi("getMaterialRequirementData");

  const getMaterialRequirementDayWiseData =
    getApi("getMaterialRequirementDayWiseData");

  const getOpenSOSummaryData =
    getApi("getOpenSOSummaryData");

  const getOpenSODetailsData =
    getApi("getOpenSODetailsData");

  const getProcPlanningData =
    getApi("getProcPlanningData");

  const updateProcurementPlanningSimulatedQty =
    getApi("updateProcurementPlanningSimulatedQty");

  const getProdDataAfterSimulation =
    getApi("getProdDataAfterSimulation");

  const getDayWiseCoverageData =
    getApi("getDayWiseCoverageData");

  const getRMPMCoverageData =
    getApi("getRMPMCoverageData");

  const getRMPMBufferTrendData =
    getApi("getRMPMBufferTrendData");

  const getExpiditingRMData =
    getApi("getExpiditingRMData");


  const r = Math.random();

  if (r < 0.75) {
    getOpenSOSummaryData(user);
    getOpenSODetailsData(user);
    getProcPlanningData(user);
    updateProcurementPlanningSimulatedQty(user);
    getProdDataAfterSimulation(user);
    getMaterialRequirementData(user);
    getMaterialRequirementDayWiseData(user);
    getDayWiseCoverageData(user);
    getRMPMCoverageData(user);
    getRMPMBufferTrendData(user);
    getExpiditingRMData(user);
  }
}


// register this workflow and the APIs it relies on
registerWorkflow({
  name: "procurement",
  fn: procurementWorkflow,
  apis: [
    "getMaterialRequirementData",
    "getMaterialRequirementDayWiseData",
    "getOpenSOSummaryData",
    "getOpenSODetailsData",
    "getProcPlanningData",
    "updateProcurementPlanningSimulatedQty",
    "getProdDataAfterSimulation",
    "getDayWiseCoverageData",
    "getRMPMCoverageData",
    "getRMPMBufferTrendData",
    "getExpiditingRMData",
  ],
});
