import { useState } from "react";

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      courseId: "C101",
      courseName: "Web Development",
      courseDescription: "Learn HTML, CSS, JS",
      courseDuration: "6 months",
    },
  ]);
  const [newCourse, setNewCourse] = useState({
    courseId: "",
    courseName: "",
    courseDescription: "",
    courseDuration: "",
  });

  const handleAddCourse = () => {
    if (!newCourse.courseId || !newCourse.courseName) return;
    setCourses([...courses, newCourse]);
    setNewCourse({ courseId: "", courseName: "", courseDescription: "", courseDuration: "" });
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.courseId !== courseId));
  };

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Course ID"
          className="border p-2"
          value={newCourse.courseId}
          onChange={(e) => setNewCourse({ ...newCourse, courseId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course Name"
          className="border p-2"
          value={newCourse.courseName}
          onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2"
          value={newCourse.courseDescription}
          onChange={(e) => setNewCourse({ ...newCourse, courseDescription: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          className="border p-2"
          value={newCourse.courseDuration}
          onChange={(e) => setNewCourse({ ...newCourse, courseDuration: e.target.value })}
        />
        <button onClick={handleAddCourse} className="bg-blue-500 text-white p-2 rounded">
          Add Course
        </button>
      </div>
      <ul>
        {courses.map((course) => (
          <li key={course.courseId} className="border p-2 mb-2 flex justify-between">
            {course.courseName} ({course.courseDuration})
            <button
              onClick={() => handleDeleteCourse(course.courseId)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManagement;
