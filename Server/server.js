const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db_connect");

const Router = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.path === '/index.html') {
    return res.redirect(301, '/');
  }
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
