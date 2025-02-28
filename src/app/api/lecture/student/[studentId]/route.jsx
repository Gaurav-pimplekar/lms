import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    try {
      await dbConnect();
  
      
      const studentId = await params;
  
      if (!studentId) {
        return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
      }
  
      const lectures = await Lecture.find({ "students.student": studentId })
        .populate("faculty", "name email") // Populate faculty details
        .populate("course", "courseName") // Populate course details
        .populate("assignments.assignment", "assignmentTitle dueDate") // Populate assignments
        .populate("chapters.chapter", "chapterName") // Populate chapters
        .populate("attendences.attendence", "isPresent remark"); // Populate attendance
  
      return NextResponse.json({ lectures }, { status: 200 });
    } catch (error) {
      console.error("Error fetching enrolled lectures:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  