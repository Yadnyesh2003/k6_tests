// import { pickRandom } from "./utils.js";

// const cache = {};

// export function randomPayload(app, api) {
//   const key = `${app}/${api}`;

//   if (!cache[key]) {
//     cache[key] = JSON.parse(open(`../payloads/${app}/${api}.json`));
//   }

//   return pickRandom(cache[key]);
// }


// import { payloads } from "./payloadRegistry.js";
// import { pickRandom } from "./utils.js";

// export function randomPayload(app, api) {
//   return pickRandom(payloads[`${app}/${api}`]);
// }


import { payloads } from "./payloadRegistry.js";
import { pickRandom } from "./utils.js";

export function randomPayload(app, api) {
    const arr = payloads[`${app}/${api}`];

    // SharedArray is array-like but not a real Array, so avoid Array.isArray checks.
    if (!arr || typeof arr.length !== "number" || arr.length === 0) {
        console.warn(`No payload found for ${app}/${api}, returning empty object`);
        return { params: {}, body: {} }; // safe default
    }

    return pickRandom(arr);
}
