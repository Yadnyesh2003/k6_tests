import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";

export function getDayWiseCoverageData(user) {
  const payloadObj = randomPayload("procurement", "getDayWiseCoverageData");
  const payload = payloadObj.body || {};
  const params = payloadObj.params || {};
  const queryString = buildQueryString(params)

  put(
    `${config.BASE_URL}/api/mto/getDayWiseCoverageData/?${queryString}`,
    payload,
    buildHeaders(user),
    { name: "procurement_getDayWsieCoverageData" }
  );
  sleepRandom(config.waitMin, config.waitMax);
}