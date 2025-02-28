import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    try {
      await dbConnect();
  
      const { assignmentId } = await req.json();
      const {id} = await params;
  
      if (!id || !assignmentId) {
        return NextResponse.json({ error: "Lecture ID and Assignment ID are required" }, { status: 400 });
      }
  
      const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        { $addToSet: { assignments: assignmentId } }, // Prevents duplicate assignments
        { new: true }
      );
  
      if (!updatedLecture) {
        return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Assignment added successfully", updatedLecture });
    } catch (error) {
      console.error("Error adding assignment:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  