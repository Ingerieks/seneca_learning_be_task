import mongoose, { Schema, Document, Model } from "mongoose";
import { ISession } from "../interfaces/session";

const SessionSchema: Schema<ISession> = new mongoose.Schema(
  {
    totalModulesStudied: { type: Number, required: true },
    averageScore: { type: Number, required: true },
    timeStudied: { type: Number, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);
export default SessionSchema;
