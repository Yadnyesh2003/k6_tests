import http from "k6/http";
import { check } from "k6";
import { Trend, Rate, Counter, Gauge } from "k6/metrics";

// Custom metrics
export const httpReqDuration = new Trend("http_req_duration_custom", true);
export const httpReqErrors = new Counter("http_req_errors");
export const httpReqSuccessRate = new Rate("http_req_success_rate");
export const httpReqInFlight = new Gauge("http_req_in_flight");
export const httpResByStatus = new Counter("http_responses_by_status"); // New metric

// Function to record common metrics
function recordMetrics(res, tags = {}) {
  if (res && res.timings && typeof res.timings.duration === "number") {
    httpReqDuration.add(res.timings.duration, tags);
  }

  const success = res && res.status >= 200 && res.status < 300;
  httpReqSuccessRate.add(success, tags);

  if (!success) {
    httpReqErrors.add(1, tags);
  }

  // Track all statuses
  if (res && res.status) {
    httpResByStatus.add(1, { ...tags, status: res.status });
  }
}

// export function get(url, body = {}, headers = {}, tags = {}) {
//   // Some callers pass (url, payload, headers, tags). GET doesn't use a body,
//   // but we accept it to keep call sites unchanged.
//   httpReqInFlight.add(1, tags);

//   const res = http.get(url, {
//     headers,
//     tags,
//   });

//   recordMetrics(res, tags);

//   check(res, {
//     "status 200": (r) => r.status === 200,
//   });

//   httpReqInFlight.add(-1, tags);
//   return res;
// }

let globalTags = {};

export function setGlobalTags(tags) {
  globalTags = { ...(tags || {}) };
}

function normalizeTagsParam(tags) {
  // support either a flat tags obj or { tags: { ... } } legacy callers
  if (!tags) return {};
  if (tags.tags && typeof tags.tags === "object") return tags.tags;
  return tags;
}

export function get(url, body, headers, tags = {}) {
  const merged = { ...globalTags, ...normalizeTagsParam(tags) };
  httpReqInFlight.add(1, merged);

  const res = http.get(url, {
    headers,
    tags: merged,
  });

  recordMetrics(res, merged);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  httpReqInFlight.add(-1, merged);
  return res;
}


// PUT request wrapper
export function put(url, body, headers, tags = {}) {
  const merged = { ...globalTags, ...normalizeTagsParam(tags) };
  httpReqInFlight.add(1, merged);

  const res = http.put(url, JSON.stringify(body), {
    headers,
    tags: merged,
  });

  recordMetrics(res, merged);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  httpReqInFlight.add(-1, merged);
  return res;
}

// POST request wrapper
export function post(url, body, headers, tags = {}) {
  const merged = { ...globalTags, ...normalizeTagsParam(tags) };
  httpReqInFlight.add(1, merged);

  const res = http.post(url, JSON.stringify(body), {
    headers,
    tags: merged,
  });

  recordMetrics(res, merged);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  httpReqInFlight.add(-1, merged);
  return res;
}
