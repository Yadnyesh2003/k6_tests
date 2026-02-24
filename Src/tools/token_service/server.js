import express from "express";
import { tokenManager } from "./tokenManager.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Get all tokens
app.get("/tokens", (req, res) => {
    const tokens = tokenManager.getTokens();
    res.json(tokens);
});

// Get token for a specific user
app.get("/token", (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: "Email query parameter is required" });
    }

    const tokenInfo = tokenManager.getToken(email);
    if (!tokenInfo) {
        return res.status(404).json({ error: "User not found or not logged in" });
    }

    res.json(tokenInfo);
});

async function start() {
    try {
        await tokenManager.init();
        app.listen(PORT, () => {
            console.log(`\n🚀 Token Refresh Service running at http://localhost:${PORT}`);
            console.log(`- GET /tokens: View all tokens`);
            console.log(`- GET /token?email=...: Get specific user token\n`);
        });
    } catch (error) {
        console.error("❌ Failed to start Token Refresh Service:", error.message);
        process.exit(1);
    }
}

start();
