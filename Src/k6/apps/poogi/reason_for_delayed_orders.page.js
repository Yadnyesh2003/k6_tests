import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getPoogiReasonMasterData(user) {
    const payload = {};

    get(
        `${config.BASE_URL}/api/mto/getPoogiReasonMasterData/`,
        payload,
        buildHeaders(user),
        {
            name: "getPoogiReasonMasterData",
            page: "reason_for_delayed_orders",
            app: "poogi"
        }
    );

    sleepRandom(config.waitMin, config.waitMax);
}


function getPoogiReasonForDealyedOrdersData(user) {
    const payloadObj = randomPayload("poogi", "getPoogiReasonForDealyedOrdersData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);

    put(
        `${config.BASE_URL}/api/mto/getPoogiReasonForDealyedOrdersData/?${queryString}`,
        payload,
        buildHeaders(user),
        {
            name: "getPoogiReasonForDealyedOrdersData",
            page: "reason_for_delayed_orders",
            app: "poogi"
        }
    );
    sleepRandom(config.waitMin, config.waitMax);
}


registerAPI({
    name: "getPoogiReasonMasterData",
    page: "reason_for_delayed_orders",
    app: "poogi",
    fn: getPoogiReasonMasterData
});

registerAPI({
    name: "getPoogiReasonForDealyedOrdersData",
    page: "reason_for_delayed_orders",
    app: "poogi",
    fn: getPoogiReasonForDealyedOrdersData
});