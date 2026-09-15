const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  if (
    mongoUri.includes("127.0.0.1") ||
    mongoUri.includes("localhost")
  ) {
    throw new Error(
      "MONGO_URI points to localhost and cannot be used on Vercel"
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

module.exports = connectDB;
