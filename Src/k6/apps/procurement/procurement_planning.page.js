import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { sleepRandom } from "../../lib/utils.js";

export function getProcPlanningData(user) {

  const payloadObj = randomPayload("procurement", "getProcPlanningData");
  const payload = payloadObj.params || {};

  put(
    `${config.BASE_URL}/api/mto/getProcPlanningData/`,
    payload,
    buildHeaders(user),
    { name: "procurement_getProcPlanningData" }
  );

  sleepRandom(config.waitMin, config.waitMax);
}
