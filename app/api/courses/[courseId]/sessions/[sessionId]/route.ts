import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Session } from "@/lib/models/session";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { sessionId: String; courseId: String } }
) {
  try {
    await dbConnect();
    const { courseId, sessionId } = await params;

    if (!sessionId || !courseId) {
      return NextResponse.json({ error: "No not found" }, { status: 400 });
    }

    const session = await Session.find({ _id: sessionId });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
