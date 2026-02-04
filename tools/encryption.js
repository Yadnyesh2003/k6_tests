import crypto from "crypto";
import fs from "fs";

const { SECRET_KEY } = JSON.parse(
  fs.readFileSync("./config.json")
);

export function encryptPassword(plain) {

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    "aes-256-ctr",   // ⭐ FIXED
    Buffer.from(SECRET_KEY, "utf-8"),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(plain, "utf-8"),
    cipher.final()
  ]);

  return Buffer.concat([iv, encrypted]).toString("base64");
}
