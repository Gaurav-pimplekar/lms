import { useState } from "react";

const FacultyDashboard = () => {
  const [courses, setCourses] = useState([
    { courseId: "C101", courseName: "Web Development" },
    { courseId: "C102", courseName: "Data Structures" },
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([
    { studentId: "S201", studentName: "Alice" },
    { studentId: "S202", studentName: "Bob" },
  ]);
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState("");
  const [attendance, setAttendance] = useState({});

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleAddChapter = () => {
    if (newChapter) {
      setChapters([...chapters, newChapter]);
      setNewChapter("");
    }
  };

  const handleAddAssignment = () => {
    if (newAssignment) {
      setAssignments([...assignments, newAssignment]);
      setNewAssignment("");
    }
  };

  const handleAttendance = (studentId) => {
    setAttendance({
      ...attendance,
      [studentId]: !attendance[studentId],
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Faculty Dashboard</h2>
      {!selectedCourse ? (
        <div>
          <h3 className="text-xl mb-3">Assigned Courses</h3>
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="p-3 bg-gray-200 mb-2 cursor-pointer"
              onClick={() => handleSelectCourse(course)}
            >
              {course.courseName}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-3">{selectedCourse.courseName}</h3>
          <h4 className="text-lg font-bold mt-4">Assigned Students</h4>
          <ul>
            {students.map((student) => (
              <li key={student.studentId} className="flex justify-between p-2">
                {student.studentName}
                <input
                  type="checkbox"
                  checked={attendance[student.studentId] || false}
                  onChange={() => handleAttendance(student.studentId)}
                />
              </li>
            ))}
          </ul>
          <h4 className="text-lg font-bold mt-4">Chapters</h4>
          <input
            type="text"
            placeholder="New Chapter"
            value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddChapter} className="bg-blue-500 text-white p-2">Add</button>
          <ul className="mt-2">
            {chapters.map((chapter, index) => (
              <li key={index}>{chapter}</li>
            ))}
          </ul>
          <h4 className="text-lg font-bold mt-4">Assignments</h4>
          <input
            type="text"
            placeholder="New Assignment"
            value={newAssignment}
            onChange={(e) => setNewAssignment(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddAssignment} className="bg-blue-500 text-white p-2">Add</button>
          <ul className="mt-2">
            {assignments.map((assignment, index) => (
              <li key={index}>{assignment}</li>
            ))}
          </ul>
          <button
            onClick={() => setSelectedCourse(null)}
            className="mt-4 bg-red-500 text-white p-2"
          >
            Back to Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
