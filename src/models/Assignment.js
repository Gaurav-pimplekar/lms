import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // Faculty who created the assignment
      required: true,
    },
    assignmentTitle: {
      type: String,
      required: true,
    },
    assignmentDesc: {
      type: String,
      required: true,
    },
    assignmentLink: {
      type: String, // Link to assignment details
    },
    dueDate: {
      type: Date,
      required: true,
    },
    submissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Student who submitted
          required: true,
        },
        submissionLink: {
          type: String, // Link to the student's submitted file or work
          required: true,
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
        grade: {
          type: String, // Grade for the assignment (optional)
        },
        feedback: {
          type: String, // Faculty feedback (optional)
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);
