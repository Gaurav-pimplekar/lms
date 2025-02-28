import connectDB from "@/lib/dbConnect";
import { authMiddleware } from "@/middelware/auth";
import Assignment from "@/models/Assignment";
import Faculty from "@/models/Lecture";
import Student from "@/models/Student";
import { NextResponse } from "next/server";


export async function POST(req, {params}) {
  try {
    await connectDB();
    // Check authentication and authorization
    const authError = authMiddleware(req, ["faculty"]);
    if (authError) return authError;

    const {facultyId} = await params;
    // Parse JSON request body
    const { assignmentTitle, assignmentDesc, assignmentLink, dueDate } = await req.json();

    // Validate required fields
    if (!assignmentTitle || !assignmentDesc || !assignmentLink || !dueDate || !facultyId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    

    // Create new assignment
    const assignment = await Assignment.create({
      faculty:facultyId,
      assignmentTitle,
      assignmentLink,
      assignmentDesc,
      dueDate,
    });

    console.log(facultyId)
    // Assign the new assignment to all students under the faculty for the given course
    const students = await Student.updateMany(
      { faculty: facultyId }, // Match students assigned to this faculty
      {
        $push: {
          assignments: {
            assignment: assignment._id,
            status: "assign",
          },
        },
      }
    );

    return NextResponse.json({
      message: "Assignment created and assigned successfully",
      assignment,
      students
    });
  } catch (error) {
    console.error("Error in Faculty Assignment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(req, {params}) {
    await connectDB();
  
    // Apply authentication and role check middleware
    const authError = authMiddleware(req, ["faculty"]);
    if (authError) return authError;
  
    try {
      // Get faculty ID from decoded token
      const {facultyId} = await params;
      
  
      if (!facultyId) {
        return NextResponse.json(
          { error: "Course ID is required" },
          { status: 400 }
        );
      }
  
      // Find students assigned to this faculty
      const students = await Student.find({ faculty: facultyId }).populate(
        "assignments.assignment"
      );
  
      if (!students.length) {
        return NextResponse.json(
          { message: "No students found under this faculty" },
          { status: 200 }
        );
      }
  
      return NextResponse.json({ students }, { status: 200 });
    } catch (error) {
      console.error("Error fetching faculty assignments:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }