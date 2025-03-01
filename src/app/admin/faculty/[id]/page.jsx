"use client";
import Sidebar from "@/app/components/Sidebar";
import { fetchCourses } from "@/redux/slices/courseSlice";
import { getFaculty } from "@/redux/slices/facultySlice";
import { getAllstudents } from "@/redux/slices/studentSlice";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = ({ onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const { students } = useSelector((state) => state.student);
  const { faculty } = useSelector((state) => state.faculty);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getAllstudents());
    dispatch(getFaculty("67c03e870e4a8c158feda0a8"));
  }, []);

  const handleSaveAssignments = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/faculty/assign", {
        studentId: selectedStudent,
        courseId: selectedCourse,
        startTime,
        endTime,
        facultyId: faculty._id,
      });

      const data = res.data;
      if (response.ok) {
        setMessage("Assignments saved successfully!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar userRole={"admin"} />
      <div className="mt-5 bg-gray-100 p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-1 rounded float-right"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {faculty?.userName}'s Details
        </h2>

        {/* Assign Course */}
        <h3 className="text-lg font-semibold mb-2">Assign Course</h3>
        <div className="flex gap-2 mb-4">
          <select
            className="border p-2 flex-1"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            {courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <input
            type="time"
            className="border p-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="border p-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Assign Students */}
        <h3 className="text-lg font-semibold mb-2">Assign Students</h3>
        <div className="flex gap-2 mb-4">
          <select
            className="border p-2 flex-1"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {students?.map((student) => (
              <option key={student._id} value={student._id}>
                {student.userName}
              </option>
            ))}
          </select>
        </div>

        {/* Done Button */}
        <button
          onClick={handleSaveAssignments}
          className={`mt-4 bg-purple-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Done"}
        </button>

        {/* Success/Error Message */}
        {message && <p className="mt-2 text-center text-blue-600">{message}</p>}
      </div>
    </div>
  );
};

export default page;
