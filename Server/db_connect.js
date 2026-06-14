const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.DB_KEY || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "Missing MongoDB connection string. Set DB_KEY or MONGODB_URI in the server environment."
    );
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("Database connected successfully");
}

module.exports = connectDB;
