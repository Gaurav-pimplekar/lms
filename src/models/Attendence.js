import mongoose from "mongoose";

const AttendenceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the faculty (User model)
      required: true,
    },
    isPresent: {
        type: Boolean,
        default: false
    },
    remark:{
        type:String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Attendence || mongoose.model("Attendence", AttendenceSchema);
