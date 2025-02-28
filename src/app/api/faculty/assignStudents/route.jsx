import connectDB from "@/lib/dbConnect";
import { authMiddleware } from "@/middelware/auth";
import Faculty from "@/models/Lecture";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // Parse JSON request body
    const { facultyId, userId } = await req.json();

    // Validate required fields
    if (!facultyId || !userId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create new faculty assignment
    const student = await Student.create({
      faculty: facultyId,
      student: userId
    });

    return NextResponse.json({
      message: "Faculty student assigning updated successfully",
      student,
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

  // Apply authentication and role check middleware
  const authError = authMiddleware(req, ["faculty","student"]);
  if (authError) return authError; // Return error if authentication fails

  try {
    // Get faculty ID from decoded token
    const facultyId = req.user.id; // Assuming email is used as facultyId

    // Fetch courses assigned to the faculty
    const facultyCourses = await Faculty.find({ faculty:facultyId }).populate("faculty").populate("student");

    return NextResponse.json({ courses: facultyCourses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty students:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
