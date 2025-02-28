import mongoose, { mongo } from "mongoose";

const LectureSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    assignments: [
      {
        assignment:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Assignment"
        }
      }
    ],
    chapters: [
      {
        chapter:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Chapter"
        }
      }
    ],
    attendences: [
      {
        attendence:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Attendence"
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Lecture || mongoose.model("Lecture", LectureSchema);
