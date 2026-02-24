import { getRemoteToken } from "./tokenClient.js";

export function buildHeaders(user) {
  // Always fetch the latest token from the refresh service to ensure zero 401s
  const dynamicToken = getRemoteToken(user.email) || user.token;

  return {
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json",
    "user-id": String(user.user_id),
    "user-name": user.username,
    "Cookie": `access_token=${dynamicToken}`
  };
}
