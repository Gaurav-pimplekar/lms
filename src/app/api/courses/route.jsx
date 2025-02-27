import connectDB from "../../../lib/dbConnect";
import Course from "@/models/Course";

// Get all courses
export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find();
    return Response.json({ success: true, courses }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Create a new course
export async function POST(req) {
  try {
    await connectDB();
    const { courseId, courseName, courseDescription, courseDuration } = await req.json();
    
    const newCourse = new Course({ courseId, courseName, courseDescription, courseDuration });
    await newCourse.save();

    return Response.json({ success: true, course: newCourse }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
