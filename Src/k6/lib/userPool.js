import { SharedArray } from "k6/data";

const users = new SharedArray("users", function () {
  return JSON.parse(open("../data/users.json"));
});

export function getUser() {
  // each VU gets deterministic user
  const index = (__VU - 1) % users.length;
  return users[index];
}
