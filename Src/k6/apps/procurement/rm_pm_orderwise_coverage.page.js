import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";

export function getRMPMCoverageData(user) {
    const payloadObj = randomPayload("procurement", "getRMPMCoverageData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    if (params.graphflag === 1){
        get(
            `${config.BASE_URL}/api/mto/getRMPMCoverageData/?${queryString}`,
            payload,
            buildHeaders(user),
            { name: "procurement_getRMPMCoverageData_graph" }
        )
    }
    else{
        put(
            `${config.BASE_URL}/api/mto/getRMPMCoverageData/?${queryString}`,
            payload,
            buildHeaders(user),
            { name: "procurement_getRMPMCoverageData_grid" }
        );
    }

}