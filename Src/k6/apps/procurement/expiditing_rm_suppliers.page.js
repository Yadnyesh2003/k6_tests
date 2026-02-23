import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getExpiditingRMData(user) {
    const payloadObj = randomPayload("procurement", "getExpiditingRMData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    put(
        `${config.BASE_URL}/api/mto/getExpiditingRMData/?${queryString}`,
        payload,
        buildHeaders(user),
        {
            name: "getExpiditingRMData",
            page: "expiditing_rm_suppliers",
            app: "procurement"
        }
    )

    sleepRandom(config.waitMin, config.waitMax);

}

registerAPI({
    name: "getExpiditingRMData",
    page: "expiditing_rm_suppliers",
    app: "procurement",
    fn: getExpiditingRMData
});