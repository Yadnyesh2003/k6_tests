import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getRMPMBufferTrendData(user) {
    const payloadObj = randomPayload("procurement", "getRMPMBufferTrendData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    put(
        `${config.BASE_URL}/api/mto/getRMPMBufferTrendData/?${queryString}`,
        payload,
        buildHeaders(user),
        {
            api: "getRMPMBufferTrendData",
            page: "rm_pm_buffer_trends",
            app: "procurement"
        }
    )

    sleepRandom(config.waitMin, config.waitMax);
}

registerAPI({
    name: "getRMPMBufferTrendData",
    page: "rm_pm_buffer_trends",
    app: "procurement",
    fn: getRMPMBufferTrendData
});