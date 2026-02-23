import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getOTIFAnalysisData(user) {
    const payloadObj = randomPayload("poogi", "getOTIFAnalysisData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    if(params.graphflag === 1){
        get(
            `${config.BASE_URL}/api/mto/getOTIFAnalysisData/?${queryString}`,
            payload,
            buildHeaders(user),
            {
                name: "getOTIFAnalysisData",
                page: "otif_analysis",
                app: "poogi"
            }
        );
        sleepRandom(config.waitMin, config.waitMax);
    }
    else{
        put(
            `${config.BASE_URL}/api/mto/getOTIFAnalysisData/?${queryString}`,
            payload,
            buildHeaders(user),
            {
                name: "getOTIFAnalysisData",
                page: "otif_analysis",
                app: "poogi"
            }
         );
         sleepRandom(config.waitMin, config.waitMax);
    }
}

registerAPI({
    name: "getOTIFAnalysisData",
    page: "otif_analysis",
    app: "poogi",
    fn: getOTIFAnalysisData
});