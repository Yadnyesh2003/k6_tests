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

/**
 * Main Flow
 */
export function getProcPlanningData(user) {

  const payloadObj = randomPayload("procurement", "getProcPlanningData");
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  console.log(`${user.username} → Hitting: getProcPlanningData (ca=${params.ca})`);

  const res = put(
      `${config.BASE_URL}/api/mto/getProcPlanningData/?${queryString}`,
      payload,
      buildHeaders(user),
      { name: "procurement_getProcPlanningData" }
    );

  console.log(`${user.username} → getProcPlanningData → Status: ${res.status}`);

  sleepRandom(config.waitMin, config.waitMax);
}


export function updateProcurementPlanningSimulatedQty(user) {
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
      { name: "procurement_updateProcurementPlanningSimulatedQty" }
    );

  console.log(`${user.username} → updateProcurementPlanningSimulatedQty → Status: ${res.status}`);

  sleepRandom(config.waitMin, config.waitMax);
}


export function getProdDataAfterSimulation(user) {
  const payloadObj = randomPayload("procurement", "getProdDataAfterSimulation");
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  console.log(`${user.username} → Hitting: getProdDataAfterSimulation (eas=${params.eas})`);

  const res = get(
      `${config.BASE_URL}/api/mto/getProdDataAfterSimulation/?${queryString}`,
      payload,
      buildHeaders(user),
      { name: "procurement_getProdDataAfterSimulation" }
    );

  console.log(`${user.username} → getProdDataAfterSimulation → Status: ${res.status}`);
  console.log(`Response Body: ${res.body}`);

  sleepRandom(config.waitMin, config.waitMax);
}