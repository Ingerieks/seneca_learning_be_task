import { ISession } from "@/lib/interfaces/session";
import { Session } from "@/lib/models/session";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();
  const { courseId } = await params;
  const userId = req.headers.get("userId") as string;

  const { totalModulesStudied, averageScore, timeStudied, sessionId } =
    await req.json();

  if (
    courseId &&
    isValidObjectId(courseId) &&
    userId &&
    isValidObjectId(userId)
  ) {
    try {
      const newSession = new Session({
        sessionId,
        totalModulesStudied,
        averageScore,
        timeStudied,
        courseId: mongoose.Types.ObjectId.createFromHexString(courseId),
        userId: mongoose.Types.ObjectId.createFromHexString(userId),
      });

      const savedSession = await newSession.save();
      return Response.json({ description: "Created" }, { status: 201 });
    } catch {
      return NextResponse.json(
        { error: "This session id already exists" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "UserId or CourseId is missing or is not a valid ObjectId" },
      { status: 404 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    await dbConnect();
    const { courseId } = await params;
    const userId = req.headers.get("userId");

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: "UserId or CourseId is missing" },
        { status: 404 }
      );
    }

    if (isValidObjectId(courseId) && isValidObjectId(userId)) {
      const sessionStats = await Session.aggregate([
        {
          $match: {
            courseId: mongoose.Types.ObjectId.createFromHexString(courseId),
            userId: mongoose.Types.ObjectId.createFromHexString(userId),
          },
        },
        {
          $group: {
            _id: "$courseId",
            totalModulesStudied: { $sum: "$totalModulesStudied" },
            averageScore: { $avg: "$averageScore" },
            timeStudied: { $sum: "$timeStudied" },
          },
        },
        {
          $project: {
            _id: 1,
            totalModulesStudied: 1,
            averageScore: { $round: ["$averageScore", 2] },
            timeStudied: 1,
          },
        },
      ]);

      return NextResponse.json(
        {
          content: sessionStats[0],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "UserId or CourseId is not a valid ObjectId" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
