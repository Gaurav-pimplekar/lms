"use client";
import { useEffect, useState } from "react";
import FacultyDetails from "./FacultyDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllfaculties } from "@/redux/slices/facultySlice";

const AssignFaculty = () => {
  const dispatch = useDispatch();
  const {faculties} = useSelector(state => state.faculty);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  console.log(faculties);
  useEffect(()=>{
    dispatch(getAllfaculties())
  },[])

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Faculty Management</h2>
      
      {/* Faculty Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Faculty ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Branch Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{faculty.userName}</td>
              <td className="border p-2">{faculty.email}</td>
              <td className="border p-2">{faculty.branchName}</td>
              <td className="border p-2">
                <button
                  onClick={() => setSelectedFaculty(faculty)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Faculty Details */}
      {selectedFaculty && <FacultyDetails faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />}
    </div>
  );
};

export default AssignFaculty;
