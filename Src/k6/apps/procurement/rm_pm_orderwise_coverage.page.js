import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getRMPMCoverageData(user) {
    const payloadObj = randomPayload("procurement", "getRMPMCoverageData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    if (params.graphflag === 1){
        get(
            `${config.BASE_URL}/api/mto/getRMPMCoverageData/?${queryString}`,
            payload,
            buildHeaders(user),
            {
                name: "getRMPMCoverageData",
                page: "rm_pm_orderwise_coverage",
                app: "procurement"
            }
        )
    }
    else{
        put(
            `${config.BASE_URL}/api/mto/getRMPMCoverageData/?${queryString}`,
            payload,
            buildHeaders(user),
            {
                name: "getRMPMCoverageData",
                page: "rm_pm_orderwise_coverage",
                app: "procurement"
            }
        );
    }

}

registerAPI({
    name: "getRMPMCoverageData",
    page: "rm_pm_orderwise_coverage",
    app: "procurement",
    fn: getRMPMCoverageData
});