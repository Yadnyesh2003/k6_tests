import { sleep } from "k6";
import { getUser } from "../../k6/lib/userPool.js";
import { buildHeaders } from "../../k6/lib/headers.js";
import { post } from "../../k6/lib/httpClient.js";
import { config } from "../../k6/config/config.js";

export const options = {
    scenarios: {
        token_longevity_test: {
            executor: "constant-vus",
            vus: 1,
            duration: "45m", // Long duration to test token refresh
        },
    },
};

export default function () {
    const user = getUser();
    const headers = buildHeaders(user);

    // Example API call that requires authentication
    // Note: Adjust the endpoint to one that exists in your system
    const url = `${config.BASE_URL}/api/mto/getPlantMasterData/`;
    const payload = {};

    const res = post(url, payload, headers, { tags: { name: "LongevityTest" } });

    if (res.status === 401) {
        console.error(`❌ [VU ${__VU}] 401 Unauthorized for ${user.email}. Token might have expired and failed to refresh.`);
    } else if (res.status === 200) {
        // console.log(`✅ [VU ${__VU}] Request successful for ${user.email}`);
    } else {
        console.warn(`⚠️ [VU ${__VU}] Request for ${user.email} returned status ${res.status}`);
    }

    sleep(10); // Wait 10 seconds between requests
}
