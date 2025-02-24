import { ISession } from "@/lib/interfaces/session";
import { Session } from "@/lib/models/session";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();
  const { courseId } = await params;

  const { totalModulesStudied, averageScore, timeStudied, userId } =
    await req.json();

  const newSession = new Session({
    totalModulesStudied,
    averageScore,
    timeStudied,
    courseId: mongoose.Types.ObjectId.createFromHexString(courseId),
    userId: mongoose.Types.ObjectId.createFromHexString(userId),
  });

  const savedSession = await newSession.save();

  return Response.json(savedSession, { status: 201 });
}
