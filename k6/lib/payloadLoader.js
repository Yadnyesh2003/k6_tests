// import { pickRandom } from "./utils.js";

// const cache = {};

// export function randomPayload(app, api) {
//   const key = `${app}/${api}`;

//   if (!cache[key]) {
//     cache[key] = JSON.parse(open(`../payloads/${app}/${api}.json`));
//   }

//   return pickRandom(cache[key]);
// }


import { payloads } from "./payloadRegistry.js";
import { pickRandom } from "./utils.js";

export function randomPayload(app, api) {
  return pickRandom(payloads[`${app}/${api}`]);
}
