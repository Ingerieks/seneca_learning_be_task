import mongoose, { Schema, Document, Model } from "mongoose";
import { ISession } from "../interfaces/session";
import { IUser } from "../interfaces/user";

const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserSchema;
