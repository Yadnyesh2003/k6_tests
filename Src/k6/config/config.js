export const config = {
  // BASE_URL: "https://lab1-be-us.vectorflow.app",
  BASE_URL: "http://10.8.1.11:2003",

  waitMin: 1,
  waitMax: 2,

  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.05"],
  }
};
