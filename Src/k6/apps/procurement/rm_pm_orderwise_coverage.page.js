import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";

export function getRMPMOrderwiseCoverageData(user) {
    const payloadObj = randomPayload("procurement", "getRMPMOrderwiseCoverageData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    if (params.graphflag === 1){
        get(
            `${config.BASE_URL}/api/mto/getRMPMOrderwiseCoverageData/?${queryString}`,
            payload,
            buildHeaders(user),
            { name: "procurement_getRMPMOrderwiseCoverageData_graph" }
        )
    }
    else{
        put(
            `${config.BASE_URL}/api/mto/getRMPMOrderwiseCoverageData/?${queryString}`,
            payload,
            buildHeaders(user),
            { name: "procurement_getRMPMOrderwiseCoverageData_grid" }
        );
    }

}