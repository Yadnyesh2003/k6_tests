import { SharedArray } from "k6/data";
import { getRemoteToken } from "./tokenClient.js";

const users = new SharedArray("users", function () {
  return JSON.parse(open("../data/users.json"));
});

export function getUser() {
  // each VU gets deterministic user
  const index = (__VU - 1) % users.length;
  const user = users[index];

  // Provide initial token as fallback, but the headers.js will also try to fetch fresh
  return user;
}
