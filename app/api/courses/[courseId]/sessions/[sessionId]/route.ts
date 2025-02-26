import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Session } from "@/lib/models/session";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { sessionId: String; courseId: String } }
) {
  try {
    await dbConnect();
    const { courseId, sessionId } = await params;
    const userId = req.headers.get("userId");

    if (!sessionId || !courseId || !userId) {
      return NextResponse.json(
        { error: "UserId or CourseId is missing" },
        { status: 404 }
      );
    }

    if (isValidObjectId(courseId) && isValidObjectId(userId)) {
      const session = await Session.findOne({ sessionId: sessionId });

      if (!session) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          content: session,
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
