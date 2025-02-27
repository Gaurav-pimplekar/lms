"use client"
import { fetchCourses } from "@/redux/slices/courseSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CourseManagement = () => {
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseDescription: "",
    courseDuration: "",
  });
  const dispatch = useDispatch();
  const {courses} = useSelector(state => state.course);

  const handleAddCourse = async () => {
    if (!newCourse.courseDuration || !newCourse.courseName) return;
    
    try {
      await axios.post("/api/courses", newCourse);
    } catch (error) {
      console.log(error);
    }

    setNewCourse({ courseName: "", courseDescription: "", courseDuration: "" });
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.courseId !== courseId));
  };

  useEffect(()=>{
    dispatch(fetchCourses());
  },[])

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Courses</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Course Name"
          className="border p-2 rounded-lg shadow-sm"
          value={newCourse.courseName}
          onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded-lg shadow-sm"
          value={newCourse.courseDescription}
          onChange={(e) => setNewCourse({ ...newCourse, courseDescription: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          className="border p-2 rounded-lg shadow-sm"
          value={newCourse.courseDuration}
          onChange={(e) => setNewCourse({ ...newCourse, courseDuration: e.target.value })}
        />
        <button onClick={handleAddCourse} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Add Course
        </button>
      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Course Name</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseId} className="hover:bg-gray-100">
              <td className="border p-2">{course.courseName}</td>
              <td className="border p-2">{course.courseDuration}</td>
              <td className="border p-2 flex gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View</button>
                <button onClick={() => handleDeleteCourse(course.courseId)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
