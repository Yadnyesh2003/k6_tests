// import fs from "fs";
// import csv from "csv-parser";
// import axios from "axios";
// import { encryptPassword } from "./encryption.js";

// const config = JSON.parse(fs.readFileSync("./config.json"));

// const CSV_FILE = "./userData.csv";
// const OUTPUT_FILE = "../k6/data/users.json";

// const users = [];

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }


// async function readCSV() {
//   return new Promise((resolve) => {
//     const rows = [];

//     fs.createReadStream(CSV_FILE)
//       .pipe(csv())
//       .on("data", (data) => rows.push(data))
//       .on("end", () => resolve(rows));
//   });
// }

// async function login(email, password) {

//   const res = await axios.post(
//     `${config.BASE_URL}/api/user/login/`,
//     {
//       email,
//       password: encryptPassword(password),
//     },
//     { withCredentials: true }
//   );

//   const token =
//     res.headers["set-cookie"]?.[0]?.match(/access_token=([^;]+)/)?.[1]
//     || res.data.token;

//   return token;
// }

// async function fetchAllUsers(adminToken) {

//   const res = await axios.get(
//     `${config.BASE_URL}/api/user/all-users/`,
//     {
//       headers: {
//         Cookie: `access_token=${adminToken}`,
//       },
//     }
//   );

//   return res.data;
// }

// async function main() {

//   const rows = await readCSV();

//   const admin = rows[0];
//   const testUsers = rows.slice(1);

//   console.log("🔐 Admin login...");

//   const adminToken = await login(admin.email, admin.password);

//   const allUsers = await fetchAllUsers(adminToken);

//   const emailMap = {};
//   allUsers.forEach(u => {
//     emailMap[u.email] = u;
//   });

//   const result = [];

//   for (const u of testUsers) {
//     try {
//       const token = await login(u.email, u.password);

//       result.push({
//         email: u.email,
//         user_id: emailMap[u.email].id,
//         username: emailMap[u.email].name || u.email,
//         token,
//       });

//       console.log("✅", u.email);

//       // Wait 2 seconds before next login to avoid rate limiter
//       await sleep(2000);

//     } catch (e) {
//       console.log("❌", u.email);

//       if (e.response) {
//         console.log("Status:", e.response.status);
//         console.log("Body:", e.response.data);
//       } else {
//         console.log(e.message);
//       }

//       // Optional: wait after failure too
//       await sleep(2000);
//     }
//   }

//   fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

//   console.log("\n🎉 users.json generated successfully!");
// }

// main();



import fs from "fs";
import csv from "csv-parser";
import axios from "axios";
import { encryptPassword } from "./encryption.js";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import path from "path";


const config = JSON.parse(fs.readFileSync("./config.json"));

const CSV_FILE = "./userData.csv";
const OUTPUT_FILE = "../k6/data/users.json";
const outputDir = path.dirname(OUTPUT_FILE);

/**
 * Create axios instance with shared cookie jar
 * (this is equivalent to Python requests.Session)
 */
const jar = new CookieJar();
const client = wrapper(
  axios.create({
    baseURL: config.BASE_URL,
    jar,
    withCredentials: true,
  })
);

async function readCSV() {
  return new Promise((resolve) => {
    const rows = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows));
  });
}

async function login(email, password) {
  const res = await client.post("/api/user/login/", {
    email,
    password: encryptPassword(password),
  });

  // Token may come from cookie or response body
  const token =
    res.headers["set-cookie"]?.[0]?.match(/access_token=([^;]+)/)?.[1] ||
    res.data?.token;

  return token;
}

async function fetchAllUsers() {
  const res = await client.get("/api/user/all-users/");
  return res.data;
}

async function main() {
  const rows = await readCSV();

  const admin = rows[0];
  const testUsers = rows.slice(1);

  console.log("🔐 Admin login...");
  await login(admin.email, admin.password);

  const allUsers = await fetchAllUsers();

  const emailMap = {};
  allUsers.forEach((u) => {
    emailMap[u.email] = u;
  });

  const result = [];

  for (const u of testUsers) {
    try {
      const token = await login(u.email, u.password);

      result.push({
        email: u.email,
        user_id: emailMap[u.email].id,
        username: emailMap[u.email].name || u.email,
        token,
      });

      console.log("✅", u.email);
    } catch (e) {
      console.log("❌", u.email);
      if (e.response) {
        console.log("Status:", e.response.status);
        console.log("Body:", e.response.data);
      } else {
        console.log(e.message);
      }
    }
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log("\n🎉 users.json generated successfully!");
}

main();
