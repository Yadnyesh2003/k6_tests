import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getMaterialRequirementData(user) {
  const payloadObj = randomPayload("procurement", "getMaterialRequirementData") || {};
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params);

  put(
    `${config.BASE_URL}/api/mto/getMaterialRequirementData/?${queryString}`,
    payload,
    buildHeaders(user),
    {
      tags: {
        api: "getMaterialRequirementData",
        page: "material_requirement",
        app: "procurement"
      }
    }
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
        {
          tags: {
            api: "getMaterialRequirementDayWiseData",
            page: "material_requirement",
            app: "procurement"
          }
        }
    );
    
    sleepRandom(config.waitMin, config.waitMax);

}

registerAPI({
  name: "getMaterialRequirementData",
  page: "material_requirement",
  app: "procurement",
  fn: getMaterialRequirementData
});


registerAPI({
  name: "getMaterialRequirementDayWiseData",
  page: "material_requirement",
  app: "procurement",
  fn: getMaterialRequirementDayWiseData
});