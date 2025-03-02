import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let cached: mongoose.Mongoose | null = null;

let mongoServer: MongoMemoryServer;

async function dbConnect() {
  if (cached) {
    return cached;
  }

  if (process.env.NODE_ENV === "test") {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    cached = await mongoose.connect(uri, {});
  } else {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    cached = await mongoose.connect(MONGODB_URI, {});
  }

  return cached;
}

export const closeDB = async () => {
  await mongoose.connection.close();
};

export default dbConnect;
