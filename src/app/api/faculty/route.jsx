import User from "@/models/User";
import connectDB from "../../../lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const faculties = await User.find({role : "faculty"});
  return NextResponse.json(faculties);
}

export async function POST(req) {
  await connectDB();
//   const error = authMiddleware(req, ["admin"]);
//   if (error) return error;

//   const { facultyId, name, department } = await req.json();
  const newFaculty = null //new Faculty({ facultyId, name, department, assignedCourses: [], assignedStudents: [] });
//   await newFaculty.save();

  return NextResponse.json({ message: "Faculty added successfully", faculty: newFaculty });
}
