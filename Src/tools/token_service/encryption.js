import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "..", "config.json");
const { SECRET_KEY } = JSON.parse(fs.readFileSync(configPath, "utf-8"));

export function encryptPassword(plain) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        "aes-256-ctr",
        Buffer.from(SECRET_KEY, "utf-8"),
        iv
    );

    const encrypted = Buffer.concat([
        cipher.update(plain, "utf-8"),
        cipher.final()
    ]);

    return Buffer.concat([iv, encrypted]).toString("base64");
}
