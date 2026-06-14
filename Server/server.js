const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db_connect");

const Router = require("./routes/index");
const app = express();

function normalizeResponsePayload(payload) {
  if (Array.isArray(payload)) {
    return payload.map(normalizeResponsePayload);
  }

  if (payload && typeof payload === "object") {
    return Object.fromEntries(
      Object.entries(payload).map(([key, value]) => [
        key,
        normalizeResponsePayload(value),
      ])
    );
  }

  if (typeof payload === "string" && payload.includes("\\")) {
    return payload.replace(/\\/g, "/");
  }

  return payload;
}

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.RENDER_EXTERNAL_URL,
  process.env.FRONTEND_URL,
];
const whitelist = (
  process.env.CORS_ALLOWED_ORIGINS || defaultOrigins.filter(Boolean).join(",")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS error: origin is not allowed"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  const originalSend = res.send.bind(res);

  res.send = (body) => {
    if (body && typeof body === "object" && !Buffer.isBuffer(body)) {
      let plainBody = body;
      try {
        // Convert mongoose documents to plain objects first
        plainBody = JSON.parse(JSON.stringify(body));
      } catch (e) {
        plainBody = body;
      }
      return originalSend(normalizeResponsePayload(plainBody));
    }

    return originalSend(body);
  };

  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", Router);

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/public")) {
    return next();
  }

  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = Number(process.env.PORT) || 8000;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
