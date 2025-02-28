import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
  try {
    await dbConnect();

    const { chapterId } = await req.json();
    const {id} = await params;

    if (!id || !chapterId) {
      return NextResponse.json(
        { error: "Lecture ID and Chapter ID are required" },
        { status: 400 }
      );
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      id,
      { $addToSet: { chapters: chapterId } }, // Prevents duplicate chapters
      { new: true }
    );

    if (!updatedLecture) {
      return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Chapter added successfully",
      updatedLecture,
    });
  } catch (error) {
    console.error("Error adding chapter:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
