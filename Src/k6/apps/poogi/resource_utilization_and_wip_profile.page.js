import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { get, put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

function getPlantMasterData(user) {
    const payload = {};
    get(
        `${config.BASE_URL}/api/mto/getPlantMasterData/`,
        payload,
        buildHeaders(user),
        {
            name: "getPlantMasterData",
            page: "resource_utilization_and_wip_profile",
            app: "poogi"
        }
    );
    sleepRandom(config.waitMin, config.waitMax);
}

function getCCRMasterData(user) {
    const payload = {};
    get(
        `${config.BASE_URL}/api/mto/getCCRMasterData/`,
        payload,
        buildHeaders(user),
        {
            name: "getCCRMasterData",
            page: "resource_utilization_and_wip_profile",
            app: "poogi"
        }
    );
    sleepRandom(config.waitMin, config.waitMax);
}

function getDeptMasterData(user) {
    const payload = {};
    get(
        `${config.BASE_URL}/api/mto/getDeptMasterData/`,
        payload,
        buildHeaders(user),
        {
            name: "getDeptMasterData",
            page: "resource_utilization_and_wip_profile",
            app: "poogi"
        }
    );
    sleepRandom(config.waitMin, config.waitMax);
}

function getResourceUtilizationAndWIPProfileData(user) {
    const payloadObj = randomPayload("poogi", "getResourceUtilizationAndWIPProfileData") || {};
    const payload = payloadObj.body || {};
    const params = payloadObj.params || {};
    const queryString = buildQueryString(params);
    get(
        `${config.BASE_URL}/api/mto/getResourceUtilizationAndWIPProfileData/?${queryString}`,
        payload,
        buildHeaders(user),
        {
            name: "getResourceUtilizationAndWIPProfileData",
            page: "resource_utilization_and_wip_profile",
            app: "poogi"
        }
    );
    sleepRandom(config.waitMin, config.waitMax);
}




registerAPI({
    name: "getPlantMasterData",
    page: "resource_utilization_and_wip_profile",
    app: "poogi",
    fn: getPlantMasterData
});

registerAPI({
    name: "getCCRMasterData",
    page: "resource_utilization_and_wip_profile",
    app: "poogi",
    fn: getCCRMasterData
});

registerAPI({
    name: "getDeptMasterData",
    page: "resource_utilization_and_wip_profile",
    app: "poogi",
    fn: getDeptMasterData
});

registerAPI({
    name: "getResourceUtilizationAndWIPProfileData",
    page: "resource_utilization_and_wip_profile",
    app: "poogi",
    fn: getResourceUtilizationAndWIPProfileData
});