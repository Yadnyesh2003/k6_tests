import { config } from "../../config/config.js";
import { randomPayload } from "../../lib/payloadLoader.js";
import { buildHeaders } from "../../lib/headers.js";
import { put } from "../../lib/httpClient.js";
import { buildQueryString, sleepRandom } from "../../lib/utils.js";
import { registerAPI } from "../../core/registry.js";

/**
 * First API: getOpenSOSummaryData
 */
function getOpenSOSummaryData(user) {

  const payloadObj = randomPayload("procurement", "getOpenSOSummaryData") || {};
  const payload = payloadObj.body|| {};

  put(
    `${config.BASE_URL}/api/mto/getOpenSOSummaryData/`,
    payload,
    buildHeaders(user),
    {
      tags:{
        name: "material_coverage_getOpenSOSummaryData",
        page: "material_coverage_for_open_sales",
        app: "procurement"
      }
    }
  );

  sleepRandom(config.waitMin, config.waitMax);
}

/**
 * Second API: getOpenSODetailsData
 */
function getOpenSODetailsData(user) {
    // Pick a random payload object from your JSON
    const payloadObj = randomPayload("procurement", "getOpenSODetailsData") || {};

    const params = payloadObj.params || {}; // query parameters
    const payload = payloadObj.body || {};  // empty body in your case

    const queryString = buildQueryString(params);

    put(
        `${config.BASE_URL}/api/mto/getOpenSODetailsData/?${queryString}`,
        payload,
        buildHeaders(user),
        {
          tags:{
            name: "material_coverage_getOpenSODetailsData",
            page: "material_coverage_for_open_sales",
            app: "procurement"
          }
        }
    );

    sleepRandom(config.waitMin, config.waitMax);
}

// export function getOpenSODetailsData(user) {
//     const payload = {}; // empty payload

//     const params = {
//         Color: "Black,Red,Yellow",
//         KitStatus: "NK",
//         S: 0,
//         E: 0,
//         page: 1,
//         page_size: 500
//     };

//     const queryString = buildQueryString(params);

//     put(
//         `${config.BASE_URL}/api/mto/getOpenSODetailsData/?${queryString}`,
//         payload,
//         buildHeaders(user),
//         { name: "material_coverage_getOpenSODetailsData" }
//     );

//     sleepRandom(config.waitMin, config.waitMax);
// }



registerAPI({
    name: "getOpenSOSummaryData",
    page: "material_coverage_for_open_sales",
    app: "procurement",
    fn: getOpenSOSummaryData
});

registerAPI({
    name: "getOpenSODetailsData",
    page: "material_coverage_for_open_sales",
    app: "procurement",
    fn: getOpenSODetailsData
});