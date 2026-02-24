import { SharedArray } from "k6/data";
import { getRemoteToken } from "./tokenClient.js";

const users = new SharedArray("users", function () {
  // Read CSV directly
  const data = open("../../tools/userData.csv");
  const lines = data.split("\n");
  const result = [];

  // Skip header (i=0)
  // According to your userData.csv:
  // 1: email,password
  // 2: admin...
  // 3: ironman...
  // 4: yadnyesh...
  // 5: load_tester1...

  // If you want to start from load_tester1, skip first 4 rows (header + 3 users)
  for (let i = 4; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const parts = line.split(",");
      result.push({
        email: parts[0],
        // password: parts[1] // if needed
      });
    }
  }
  return result;
});

export function getUser() {
  const index = (__VU - 1) % users.length;
  return users[index];
}
