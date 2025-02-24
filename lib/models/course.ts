import mongoose, { Schema, Document, Model } from "mongoose";
import { ISession } from "../interfaces/session";
import { ICourse } from "../interfaces/course";

const CourseSchema: Schema<ICourse> = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  ageGroup: { type: String, required: true },
  subject: { type: String, required: true },
  examBoard: { type: String, required: true },
  type: { type: String, required: true },
  tier: { type: String, required: true },
});

export const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
export default CourseSchema;
