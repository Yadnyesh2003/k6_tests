import http from "k6/http";

const TOKEN_SERVICE_URL = "http://localhost:3000";

/**
 * Fetches the latest valid access token for a given email from the Token Refresh Service.
 * @param {string} email 
 * @returns {string|null} The latest access token or null if fetch fails.
 */
export function getRemoteToken(email) {
    const url = `${TOKEN_SERVICE_URL}/token?email=${encodeURIComponent(email)}`;
    const res = http.get(url, {
        tags: { type: "token_fetch" }
    });

    if (res.status === 200) {
        return res.json().accessToken;
    } else {
        console.error(`[TokenClient] Failed to fetch token for ${email}: ${res.status} ${res.body}`);
        return null;
    }
}
