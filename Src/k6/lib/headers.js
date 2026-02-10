export function buildHeaders(user) {
  return {
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json",
    "user-id": String(user.user_id),
    "user-name": user.username,
    "Cookie": `access_token=${user.token}`
  };
}
