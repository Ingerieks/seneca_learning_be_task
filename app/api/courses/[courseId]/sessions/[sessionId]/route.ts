import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Session } from "@/lib/models/session";
import { isValidObjectId } from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sessionId: string; courseId: string }> }
) {
  try {
    await dbConnect();
    const sessionId = (await params).sessionId;
    const courseId = (await params).courseId;
    const userId = req.headers.get("userId");

    if (!sessionId || !courseId || !userId) {
      return NextResponse.json(
        { error: "user id, session id or course id is missing" },
        { status: 404 }
      );
    }

    if (isValidObjectId(courseId) && isValidObjectId(userId)) {
      const session = await Session.aggregate([
        {
          $match: {
            sessionId: sessionId,
          },
        },
        {
          $project: {
            _id: 0,
            sessionId: 1,
            totalModulesStudied: 1,
            averageScore: 1,
            timeStudied: 1,
          },
        },
      ]);
      if (session.length <= 0) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(session[0], { status: 200 });
    } else {
      return NextResponse.json(
        { error: "User id or course id is not a valid ObjectId" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
