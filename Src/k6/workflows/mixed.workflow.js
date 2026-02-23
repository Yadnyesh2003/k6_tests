import { getApi, registerWorkflow } from "../core/registry.js";

export function mixedWorkflow(user) {

  const getProcPlanningData = getApi("getProcPlanningData");
  const updateProcurementPlanningSimulatedQty = getApi("updateProcurementPlanningSimulatedQty");
  const getMaterialRequirementData = getApi("getMaterialRequirementData");

  const getOTIFAnalysisData = getApi("getOTIFAnalysisData");
  const getOTandIFAnalysisData = getApi("getOTandIFAnalysisData");
  const getResourceUtilizationAndWIPProfileData = getApi("getResourceUtilizationAndWIPProfileData");

  const r = Math.random();

  if (r < 0.5) {
    // procurement-heavy path
    if (typeof getProcPlanningData === "function") getProcPlanningData(user);
    if (Math.random() < 0.8 && typeof updateProcurementPlanningSimulatedQty === "function") updateProcurementPlanningSimulatedQty(user);
    if (Math.random() < 0.6 && typeof getMaterialRequirementData === "function") getMaterialRequirementData(user);

    // a bit of poogi
    if (Math.random() < 0.7 && typeof getOTIFAnalysisData === "function") getOTIFAnalysisData(user);
    if (Math.random() < 0.5 && typeof getResourceUtilizationAndWIPProfileData === "function") getResourceUtilizationAndWIPProfileData(user);
  }
  else {
    // poogi-heavy path
    if (typeof getOTandIFAnalysisData === "function") getOTandIFAnalysisData(user);
    if (Math.random() < 0.8 && typeof getOTIFAnalysisData === "function") getOTIFAnalysisData(user);
    if (Math.random() < 0.6 && typeof getResourceUtilizationAndWIPProfileData === "function") getResourceUtilizationAndWIPProfileData(user);

    // some procurement calls
    if (Math.random() < 0.5 && typeof getProcPlanningData === "function") getProcPlanningData(user);
    if (Math.random() < 0.3 && typeof getMaterialRequirementData === "function") getMaterialRequirementData(user);
  }

}

// register this workflow and the APIs it relies on
registerWorkflow({
  name: "mixed",
  fn: mixedWorkflow,
  apis: [
    "getProcPlanningData",
    "updateProcurementPlanningSimulatedQty",
    "getMaterialRequirementData",
    "getOTIFAnalysisData",
    "getOTandIFAnalysisData",
    "getResourceUtilizationAndWIPProfileData",
  ],
});
