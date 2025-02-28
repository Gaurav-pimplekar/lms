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
  },
  { timestamps: true }
);

export default mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);
