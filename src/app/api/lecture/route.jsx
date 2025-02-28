import connectDB from "@/lib/dbConnect";
import { authMiddleware } from "@/middelware/auth";
import Lecture from "@/models/Lecture";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // Parse JSON request body
    const { facultyId, courseId, startTime, endTime, students } = await req.json();

    // Validate required fields
    if (!facultyId || !courseId || !startTime || !endTime || !students) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create new faculty assignment
    const lecture = await Lecture.create({
      faculty: facultyId,
      course: courseId,
      startTime,
      endTime,
      students
    });

    return NextResponse.json({
      message: "Faculty student assigning updated successfully",
      lecture,
    });
  } catch (error) {
    console.error("Error in Faculty Assignment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();


  const authError = authMiddleware(req, ["admin"]);
  if (authError) return authError;

  try {
    
    // Fetch courses assigned to the faculty
    const facultyCourses = await Lecture.find({});

    return NextResponse.json({ courses: facultyCourses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty students:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
