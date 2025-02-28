import dbConnect from "@/lib/dbConnect";
import Attendence from "@/models/Attendence";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    try {
      await dbConnect();
  
      const { studentId, isPresent, remark } = await req.json();
      const {id} = await params;
  
      if (!id || !studentId || typeof isPresent !== "boolean") {
        return NextResponse.json({ error: "Lecture ID, Student ID, and Attendance Status are required" }, { status: 400 });
      }
  
      const attendance = await Attendence.create({ student: studentId, isPresent, remark });
  
      const updatedLecture = await Lecture.findByIdAndUpdate(
        id,
        { $addToSet: { attendences: attendance._id } }, // Add new attendance entry
        { new: true }
      );
  
      if (!updatedLecture) {
        return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Attendance marked successfully", updatedLecture });
    } catch (error) {
      console.error("Error marking attendance:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  