import User from "@/models/User";
import connectDB from "../../../lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const faculties = await User.find({role : "student"});
  return NextResponse.json(faculties);
}
