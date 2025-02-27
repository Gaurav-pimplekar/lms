import connectDB from "@/lib/dbConnect";
import { authMiddleware } from "@/middelware/auth";
import Faculty from "@/models/Faculty";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectDB();
  
      // Parse JSON request body
      const { facultyId, courseId, studentId, startTime, endTime } = await req.json();
  
      // Validate required fields
      if (!facultyId || !courseId || !studentId || !startTime || !endTime) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      // Create new faculty assignment
      const faculty = await Faculty.create({
        facultyId,
        courseId,
        studentId,
        startTime,
        endTime
      });
  
      return NextResponse.json({ message: "Faculty assignments updated successfully", faculty });
  
    } catch (error) {
      console.error("Error in Faculty Assignment:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }


  export async function GET(req) {
    await connectDB();
  
    // Apply authentication and role check middleware
    const authError = authMiddleware(req, ["faculty"]);
    if (authError) return authError; // Return error if authentication fails
  
    try {
      // Get faculty ID from decoded token
      const facultyId = req.user.id; // Assuming email is used as facultyId
  
      // Fetch courses assigned to the faculty
      const facultyCourses = await Faculty.find({ facultyId }).populate("courseId").populate("facultyId").populate("studentId");
  
      return NextResponse.json({ courses: facultyCourses }, { status: 200 });
  
    } catch (error) {
      console.error("Error fetching faculty assignments:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }