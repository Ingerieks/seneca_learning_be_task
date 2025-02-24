import mongoose from "mongoose";
import { Course } from "@/lib/models/course";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/lib/models/user";
import { ICourse } from "@/lib/interfaces/course";
import { IUser } from "@/lib/interfaces/user";

async function Seed() {
  try {
    await dbConnect();
    const existingCourse = await Course.findOne({
      title: "Biology IB Diploma",
    });

    if (existingCourse) {
      console.log("This course already exists");
    } else {
      const newCourse = new Course<ICourse>({
        title: "Biology IB Diploma",
        price: "Free",
        ageGroup: "IB Diploma",
        subject: "Biology",
        examBoard: "IB",
        type: "standard",
        tier: "higher",
      });

      await newCourse.save();
    }

    const existingUser = await User.findOne({ username: "Jane" });

    if (existingUser) {
      console.log("This user already exists");
    } else {
      const newUser = new User(<IUser>{
        username: "Jane",
      });

      await newUser.save();
    }

    console.error("success");
  } catch (error) {
    console.error("Error creating course:", error);
  }
}

Seed();
