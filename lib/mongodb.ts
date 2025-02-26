import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Connection } from "mongoose";

interface MongooseCache {
  conn: any | null;
  promise: Promise<any> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

let mongoServer: MongoMemoryServer;

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (process.env.NODE_ENV === "test") {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    cached.promise = mongoose.connect(uri, {});
  } else {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    cached.promise = mongoose.connect(MONGODB_URI, {});
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export default dbConnect;
