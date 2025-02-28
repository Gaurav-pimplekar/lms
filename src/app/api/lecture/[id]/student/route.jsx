import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    try {
      await dbConnect();
  
      const { studentId } = await req.json();
      const {id} = await params;
  
      if (!id || !studentId) {
        return NextResponse.json({ error: "Lecture ID and Student ID are required" }, { status: 400 });
      }
  
      const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        { $addToSet: { student: studentId } }, // Prevents duplicate students
        { new: true }
      );
  
      if (!updatedLecture) {
        return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Student added successfully", updatedLecture });
    } catch (error) {
      console.error("Error adding student:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  