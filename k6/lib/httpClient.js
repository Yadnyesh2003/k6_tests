import http from "k6/http";
import { check } from "k6";

export function put(url, body, headers, tags = {}) {
  const res = http.put(url, JSON.stringify(body), {
    headers,
    tags,
  });

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  return res;
}

export function post(url, body, headers, tags = {}) {
  const res = http.post(url, JSON.stringify(body), {
    headers,
    tags,
  });

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  return res;
}
