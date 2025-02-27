import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseDuration: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
