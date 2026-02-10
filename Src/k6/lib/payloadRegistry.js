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
