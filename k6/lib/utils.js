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

export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
