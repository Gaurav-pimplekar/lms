import mongoose from "mongoose";

let StudentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    assignments: [
      {
        assignment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Assignment",
        },
        statu: {
          type: String,
          enum: ["completed", "running", "assign"],
          default: "assign",
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
        submissionLink: {
          type: String,
        },
        grade: {
          type: String, // Grade for the assignment (optional)
        },
        feedback: {
          type: String, // Faculty feedback (optional)
        },
      },
    ],
    chapters:[
        {
            chapter:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Chapter"
            }
        }
    ]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
