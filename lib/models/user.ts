import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../interfaces/user";

const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserSchema;
