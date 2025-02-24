import { ISession } from "@/lib/interfaces/session";
import { Session } from "@/lib/models/session";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();
  const { courseId } = await params;
  const userId = req.headers.get("userId") as string;

  const { totalModulesStudied, averageScore, timeStudied } = await req.json();
  if (courseId && userId) {
    const newSession = new Session({
      totalModulesStudied,
      averageScore,
      timeStudied,
      courseId: mongoose.Types.ObjectId.createFromHexString(courseId),
      userId: mongoose.Types.ObjectId.createFromHexString(userId),
    });

    const savedSession = await newSession.save();

    return Response.json(savedSession, { status: 201 });
  } else {
    return NextResponse.json(
      { error: "Missing course id or missin user id" },
      { status: 500 }
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
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

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
          averageScore: { $sum: "$averageScore" },
          timeStudied: { $sum: "$totalModulesStudied" },
        },
      },
    ]);

    return NextResponse.json(sessionStats, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
