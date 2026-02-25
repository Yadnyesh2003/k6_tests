import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";


function getTrendOfFailureReasonsData(user){
    const payloadObj = randomPayload("poogi", "getTrendOfFailureReasonsData") || {};
    const payload = payloadObj.body || {};

    put(
        `${config.BASE_URL}/api/mto/getTrendOfFailureReasonsData/`,
        payload,
        buildHeaders(user),
        {
            name: "getTrendOfFailureReasonsData",
            page: "trend_of_failure_reasons",
            app: "poogi"
        }
    );
    sleepRandom(config.waitMin, config.waitMax);
}

registerAPI({
    name: "getTrendOfFailureReasonsData",
    page: "trend_of_failure_reasons",
    app: "poogi",
    fn: getTrendOfFailureReasonsData
})