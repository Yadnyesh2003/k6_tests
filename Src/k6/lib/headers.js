import { getRemoteToken } from "./tokenClient.js";

export function buildHeaders(user) {
  // Always fetch the latest metadata from the refresh service to ensure zero 401s
  const remoteData = getRemoteToken(user.email);

  // Extract values with fallback
  const token = remoteData ? remoteData.accessToken : (user.token || "");
  const userId = remoteData ? remoteData.user_id : (user.user_id || "");
  const userName = remoteData ? remoteData.username : (user.username || "");

  return {
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json",
    "user-id": String(userId),
    "user-name": String(userName),
    "Cookie": `access_token=${token}`
  };
}
