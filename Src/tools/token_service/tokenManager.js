import fs from "fs";
import path from "path";
import csv from "csv-parser";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { encryptPassword } from "./encryption.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, "..", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const CSV_FILE = path.join(__dirname, "..", "userData.csv");

class TokenManager {
    constructor() {
        this.tokens = new Map(); // Map<email, { accessToken, refreshToken, expiresAt, user_id, username }>
        this.jarMap = new Map(); // Map<email, CookieJar>
        this.baseUrl = config.BASE_URL;
    }

    async init() {
        console.log("🚀 Initializing Token Manager...");
        const users = await this.readCSV();

        // Login admin first to get all user details (like userIds) if needed
        // Reusing logic from generate_users.js
        const admin = users[0];
        const testUsers = users.slice(1);

        console.log(`🔐 Logging in admin: ${admin.email}`);
        const adminSession = this.createSession(admin.email);
        await this.login(adminSession, admin.email, admin.password);

        const allUsersInfo = await this.fetchAllUsers(adminSession);
        const emailMap = {};
        allUsersInfo.forEach(u => emailMap[u.email] = u);

        console.log("🔐 Logging in test users...");
        for (const u of testUsers) {
            try {
                const session = this.createSession(u.email);
                const accessToken = await this.login(session, u.email, u.password);

                const userInfo = emailMap[u.email] || {};
                this.updateTokenStore(u.email, accessToken, userInfo.id, userInfo.name || u.email);

                console.log(`✅ Logged in: ${u.email}`);
            } catch (error) {
                console.error(`❌ Failed to login ${u.email}:`, error.message);
            }
        }

        // Start background refresh loop
        this.startRefreshLoop();
    }

    createSession(email) {
        const jar = new CookieJar();
        const client = wrapper(axios.create({
            baseURL: this.baseUrl,
            jar,
            withCredentials: true
        }));
        this.jarMap.set(email, jar);
        return client;
    }

    async readCSV() {
        return new Promise((resolve) => {
            const rows = [];
            fs.createReadStream(CSV_FILE)
                .pipe(csv())
                .on("data", (data) => rows.push(data))
                .on("end", () => resolve(rows));
        });
    }

    async login(client, email, password) {
        const res = await client.post("/api/user/login/", {
            email,
            password: encryptPassword(password),
        });

        const accessToken = res.headers["set-cookie"]?.[0]?.match(/access_token=([^;]+)/)?.[1] || res.data?.token;
        return accessToken;
    }

    async fetchAllUsers(client) {
        const res = await client.get("/api/user/all-users/");
        return res.data;
    }

    updateTokenStore(email, accessToken, user_id, username) {
        const decoded = jwt.decode(accessToken);
        const expiresAt = decoded.exp * 1000; // convert to ms

        this.tokens.set(email, {
            accessToken,
            expiresAt,
            user_id,
            username
        });
    }

    async refreshUserToken(email, retryCount = 0) {
        const timestamp = new Date().toLocaleTimeString();
        try {
            const jar = this.jarMap.get(email);
            const client = wrapper(axios.create({
                baseURL: this.baseUrl,
                jar,
                withCredentials: true
            }));

            const refreshUrl = "/api/user/token/refresh/";
            const res = await client.post(refreshUrl, {});

            const setCookies = res.headers["set-cookie"] || [];
            let newAccessToken = null;
            for (const cookie of setCookies) {
                const match = cookie.match(/access_token=([^;]+)/);
                if (match) {
                    newAccessToken = match[1];
                    break;
                }
            }

            if (!newAccessToken) {
                newAccessToken = res.data?.token || res.data?.data?.token;
            }

            if (newAccessToken) {
                const current = this.tokens.get(email);
                this.updateTokenStore(email, newAccessToken, current.user_id, current.username);
                console.log(`[${timestamp}] ✨ Token refreshed successfully for: ${email}`);
                return true;
            } else {
                throw new Error("New access token not found in response");
            }
        } catch (error) {
            const isNetworkError = error.code === 'ENOTFOUND' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT';

            if (isNetworkError && retryCount < 2) {
                console.warn(`[${timestamp}] ⚠️ Network error (${error.code}) refreshing ${email}. Retrying in 2s... (Attempt ${retryCount + 1})`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                return this.refreshUserToken(email, retryCount + 1);
            }

            const status = error.response?.status;
            const data = error.response?.data;
            console.error(`[${timestamp}] ❌ Failed to refresh token for ${email}: Status ${status || error.code}`);
            if (typeof data === "string" && data.includes("<!DOCTYPE html>")) {
                console.error("📄 Received HTML error from server.");
            } else if (data) {
                console.error("📦 Error Data:", JSON.stringify(data).substring(0, 200));
            } else {
                console.error("⚠️ Message:", error.message);
            }
            return false;
        }
    }

    startRefreshLoop() {
        setInterval(async () => {
            const now = Date.now();
            const REFRESH_THRESHOLD = 5 * 60 * 1000;

            for (const [email, info] of this.tokens.entries()) {
                if (info.expiresAt - now < REFRESH_THRESHOLD) {
                    await this.refreshUserToken(email);
                    // Add small delay between users to avoid DNS/API bursts
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }, 30000);
    }

    getTokens() {
        return Array.from(this.tokens.entries()).map(([email, data]) => ({
            email,
            ...data
        }));
    }

    getToken(email) {
        return this.tokens.get(email);
    }
}

export const tokenManager = new TokenManager();
