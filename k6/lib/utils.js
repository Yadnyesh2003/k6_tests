import { sleep } from "k6";

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleepRandom(min, max) {
  const t = randomInt(min, max);
  sleep(t);
}

// export function sleepRandom(min, max) {
//   sleep(Math.random() * (max - min) + min);
// }

// export function pickRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

export function pickRandom(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
}


// export function randomPayload(module, apiName) {
//     const payloads = payloadStore[module]?.[apiName];
//     if (!payloads || payloads.length === 0) {
//         // Return an empty payload if nothing exists
//         return { body: {} };
//     }
//     return pickRandom(payloads);
// }

export function buildQueryString(params) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
}
