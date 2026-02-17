// import { config } from "../../config/config.js";
// import { randomPayload } from "../../lib/payloadLoader.js";
// import { buildHeaders } from "../../lib/headers.js";
// import { put } from "../../lib/httpClient.js";
// import { sleepRandom } from "../../lib/utils.js";

// export function getProcPlanningData(user) {

//   const payloadObj = randomPayload("procurement", "getProcPlanningData");
//   const payload = payloadObj.params || {};

//   put(
//     `${config.BASE_URL}/api/mto/getProcPlanningData/`,
//     payload,
//     buildHeaders(user),
//     { name: "procurement_getProcPlanningData" }
//   );

//   sleepRandom(config.waitMin, config.waitMax);
// }



import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put, get, post } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

/**
 * Main Flow
 */
function getProcPlanningData(user) {

  const payloadObj = randomPayload("procurement", "getProcPlanningData");
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  console.log(`${user.username} → Hitting: getProcPlanningData (ca=${params.ca})`);

  const res = put(
      `${config.BASE_URL}/api/mto/getProcPlanningData/?${queryString}`,
      payload,
      buildHeaders(user),
      {
        // tags:{
          api: "getProcPlanningData",
          page: "procurement_planning",
          app: "procurement"
        // }
      }
    );

  console.log(`${user.username} → getProcPlanningData → Status: ${res.status}`);

  sleepRandom(config.waitMin, config.waitMax);
}


function updateProcurementPlanningSimulatedQty(user) {
  const payloadObj = randomPayload("procurement", "updateProcurementPlanningSimulatedQty");
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  // payload.username = user.username;
  const requestBody = { ...payload, username: user.username };

  console.log(`${user.username} → Hitting: updateProcurementPlanningSimulatedQty (ca=${params.ca})`);
  const res = post(
      `${config.BASE_URL}/api/mto/updateProcurementPlanningSimulatedQty/?${queryString}`,
      // payload,
      requestBody,
      buildHeaders(user),
      {
        tags:{
          api: "updateProcurementPlanningSimulatedQty",
          page: "procurement_planning",
          app: "procurement"
        }
      }
    );

  console.log(`${user.username} → updateProcurementPlanningSimulatedQty → Status: ${res.status}`);

  sleepRandom(config.waitMin, config.waitMax);
}


function getProdDataAfterSimulation(user) {
  const payloadObj = randomPayload("procurement", "getProdDataAfterSimulation");
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  console.log(`${user.username} → Hitting: getProdDataAfterSimulation (eas=${params.eas})`);

  const res = get(
      `${config.BASE_URL}/api/mto/getProdDataAfterSimulation/?${queryString}`,
      payload,
      buildHeaders(user),
      {
        tags:{
          api: "getProdDataAfterSimulation",
          page: "procurement_planning",
          app: "procurement"
        }
      }
    );

  console.log(`${user.username} → getProdDataAfterSimulation → Status: ${res.status}`);
  console.log(`Response Body: ${res.body}`);

  sleepRandom(config.waitMin, config.waitMax);
}


registerAPI({
  name: "getProcPlanningData",
  page: "procurement_planning",
  app: "procurement",
  fn: getProcPlanningData
});

registerAPI({
  name: "updateProcurementPlanningSimulatedQty",
  page: "procurement_planning",
  app: "procurement",
  fn: updateProcurementPlanningSimulatedQty
});

registerAPI({
  name: "getProdDataAfterSimulation",
  page: "procurement_planning",
  app: "procurement",
  fn: getProdDataAfterSimulation
});

//