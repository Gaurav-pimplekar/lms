import { useState } from "react";

const AssignFaculty = () => {
  const [facultyList, setFacultyList] = useState([
    { facultyId: "F101", facultyName: "Dr. Smith" },
    { facultyId: "F102", facultyName: "Prof. Johnson" },
  ]);

  const [studentList, setStudentList] = useState([
    { studentId: "S201", studentName: "Alice" },
    { studentId: "S202", studentName: "Bob" },
    { studentId: "S203", studentName: "Charlie" },
  ]);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleAssign = () => {
    if (!selectedFaculty || selectedStudents.length === 0) return;
    alert(`Faculty ${selectedFaculty} assigned to students: ${selectedStudents.join(", ")}`);
    setSelectedFaculty("");
    setSelectedStudents([]);
  };

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Assign Faculty to Students</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Faculty:</label>
        <select
          className="border p-2 w-full"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
          <option value="">-- Select Faculty --</option>
          {facultyList.map((faculty) => (
            <option key={faculty.facultyId} value={faculty.facultyName}>
              {faculty.facultyName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Students:</label>
        {studentList.map((student) => (
          <div key={student.studentId} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={student.studentName}
              checked={selectedStudents.includes(student.studentName)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedStudents([...selectedStudents, e.target.value]);
                } else {
                  setSelectedStudents(
                    selectedStudents.filter((name) => name !== e.target.value)
                  );
                }
              }}
              className="mr-2"
            />
            {student.studentName}
          </div>
        ))}
      </div>
      <button onClick={handleAssign} className="bg-blue-500 text-white p-2 rounded w-full">
        Assign Faculty
      </button>
    </div>
  );
};

export default AssignFaculty;
