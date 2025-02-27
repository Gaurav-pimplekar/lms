import { useState } from "react";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([
    {
      courseId: "C101",
      courseName: "Web Development",
      faculty: "Dr. Smith",
      attendance: "85%",
      assignments: [
        { title: "HTML Basics", status: "Pending", submissionLink: "" },
        { title: "CSS Flexbox", status: "Completed", submissionLink: "https://drive.google.com/example" },
      ],
      chapters: ["Introduction to HTML", "CSS Basics", "JavaScript Fundamentals"],
    },
    {
      courseId: "C102",
      courseName: "Data Structures",
      faculty: "Prof. Johnson",
      attendance: "92%",
      assignments: [
        { title: "Arrays & Linked Lists", status: "Pending", submissionLink: "" },
      ],
      chapters: ["Stacks and Queues", "Trees", "Graphs"],
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [submissionLinks, setSubmissionLinks] = useState({});

  const handleSubmitAssignment = (courseId, assignmentTitle) => {
    if (!submissionLinks[assignmentTitle]) return;
    
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.courseId === courseId
          ? {
              ...course,
              assignments: course.assignments.map((assignment) =>
                assignment.title === assignmentTitle
                  ? { ...assignment, status: "Completed", submissionLink: submissionLinks[assignmentTitle] }
                  : assignment
              ),
            }
          : course
      )
    );
    setSubmissionLinks({ ...submissionLinks, [assignmentTitle]: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      {!selectedCourse ? (
        <div>
          <h3 className="text-xl mb-3">Assigned Courses</h3>
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="p-3 bg-gray-200 mb-2 cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              {course.courseName} - {course.faculty}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-3">{selectedCourse.courseName}</h3>
          <p className="mb-2"><strong>Faculty:</strong> {selectedCourse.faculty}</p>
          <p className="mb-4"><strong>Attendance:</strong> {selectedCourse.attendance}</p>
          <h4 className="text-lg font-bold mt-4">Chapters</h4>
          <ul>
            {selectedCourse.chapters.map((chapter, index) => (
              <li key={index}>{chapter}</li>
            ))}
          </ul>
          <h4 className="text-lg font-bold mt-4">Assignments</h4>
          <ul>
            {selectedCourse.assignments.map((assignment, index) => (
              <li key={index} className="mb-2">
                {assignment.title} - {assignment.status}
                {assignment.status === "Pending" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Google Drive Link"
                      value={submissionLinks[assignment.title] || ""}
                      onChange={(e) =>
                        setSubmissionLinks({ ...submissionLinks, [assignment.title]: e.target.value })
                      }
                      className="border p-2 mr-2"
                    />
                    <button
                      onClick={() => handleSubmitAssignment(selectedCourse.courseId, assignment.title)}
                      className="bg-blue-500 text-white p-2"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </li>
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

export default StudentDashboard;
