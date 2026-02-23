import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";


function getLeadTimeData(user) {
    const payloadObj = randomPayload("poogi", "getLeadTimeData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    if (params.graphflag === 1) {
        get(
            `${config.BASE_URL}/api/mto/getLeadTimeData/?${queryString}`,
            payload,
            buildHeaders(user),
            {
                name: "getLeadTimeData",
                page: "lead_time",
                app: "poogi"
            }
        );
        sleepRandom(config.waitMin, config.waitMax);
    }
    else {
        put(
            `${config.BASE_URL}/api/mto/getLeadTimeData/?${queryString}`,
            payload,
            buildHeaders(user),
            {
                name: "getLeadTimeData",
                page: "lead_time",
                app: "poogi"
            }
        );
        sleepRandom(config.waitMin, config.waitMax);
    }
}

registerAPI({
    name: "getLeadTimeData",
    page: "lead_time",
    app: "poogi",
    fn: getLeadTimeData
});