import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";

export function getMaterialRequirementData(user) {
  const payloadObj = randomPayload("procurement", "getMaterialRequirementData") || {};
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  put(
    `${config.BASE_URL}/api/mto/getMaterialRequirementData/?${queryString}`,
    payload,
    buildHeaders(user),
    { name: "procurement_getMaterialRequirementData" }
  );

  sleepRandom(config.waitMin, config.waitMax);
}

export function getMaterialRequirementDayWiseData(user) {
    const payloadObj = randomPayload("procurement", "getMaterialRequirementDayWiseData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);
    
    put(
        `${config.BASE_URL}/api/mto/getMaterialRequirementDayWiseData/?${queryString}`,
        payload,
        buildHeaders(user),
        { name: "procurement_getMaterialRequirementDayWiseData" }
    );
    
    sleepRandom(config.waitMin, config.waitMax);

}