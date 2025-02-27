import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // Reference to the faculty (User model)
      required: true,
    },
    chapterName: {
      type: String,
      required: true,
    },
    chapterDesc: {
      type: String,
    },
    chapterMaterial: {
      type: String, // Can store a URL or file path to study material
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);
