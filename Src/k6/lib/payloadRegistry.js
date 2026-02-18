import { SharedArray } from "k6/data";

/*
ONLY place where open() exists
Runs once in init stage
Memory efficient
*/

export const payloads = {
  // PROCUREMENT
  "procurement/getProcPlanningData": new SharedArray(
    "procurement_getProcPlanningData",
    () => JSON.parse(open("../payloads/procurement/getProcPlanningData.json"))
  ),

  "procurement/getOpenSODetailsData": new SharedArray(
    "procurement_getOpenSODetailsData",
    () => JSON.parse(open("../payloads/procurement/getOpenSODetailsData.json"))
  ),

  "procurement/getOpenSOSummaryData": new SharedArray(
    "procurement_getOpenSOSummaryData",
    () => JSON.parse(open("../payloads/procurement/getOpenSOSummaryData.json"))
  ),

  "procurement/getMaterialRequirementData": new SharedArray(
    "procurement_getMaterialRequirementData",
    () => JSON.parse(open("../payloads/procurement/getMaterialRequirementData.json"))
  ),

  "procurement/getMaterialRequirementDayWiseData": new SharedArray(
    "procurement_getMaterialRequirementDayWiseData",
    () => JSON.parse(open("../payloads/procurement/getMaterialRequirementDayWiseData.json"))
  ),

  "procurement/getDayWiseCoverageData": new SharedArray(
    "procurement_getDayWiseCoverageData",
    () => JSON.parse(open("../payloads/procurement/getDayWiseCoverageData.json"))
  ),

  "procurement/getRMPMCoverageData": new SharedArray(
    "procurement_getRMPMCoverageData",
    () => JSON.parse(open("../payloads/procurement/getRMPMCoverageData.json"))
  ),

  "procurement/getRMPMBufferTrendData": new SharedArray(
    "procurement_getRMPMBufferTrendData",
    () => JSON.parse(open("../payloads/procurement/getRMPMBufferTrendData.json"))
  ),

  "procurement/getExpiditingRMData": new SharedArray(
    "procurement_getExpiditingRMData",
    () => JSON.parse(open("../payloads/procurement/getExpiditingRMData.json"))
  ),

  "procurement/getProdDataAfterSimulation": new SharedArray(
    "procurement_getProdDataAfterSimulation",
    () => JSON.parse(open("../payloads/procurement/getProdDataAfterSimulation.json"))
  ),

  "procurement/updateProcurementPlanningSimulatedQty": new SharedArray(
    "procurement_updateProcurementPlanningSimulatedQty", 
    () => JSON.parse(open("../payloads/procurement/updateProcurementPlanningSimulatedQty.json")) 
  ),

//   "procurement/getSuppliers": new SharedArray(
//     "procurement_getSuppliers",
//     () => JSON.parse(open("../payloads/procurement/getSuppliers.json"))
//   ),

//   "procurement/releaseOrders": new SharedArray(
//     "procurement_releaseOrders",
//     () => JSON.parse(open("../payloads/procurement/releaseOrders.json"))
//   ),

//   // PRODUCTION
//   "production/getProductionPlan": new SharedArray(
//     "production_getProductionPlan",
//     () => JSON.parse(open("../payloads/production/getProductionPlan.json"))
//   ),
};
