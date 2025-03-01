'use client'
import { useState } from "react";
import { FaTachometerAlt, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import UserManagement from "../admin/user/page";
import CourseManagement from "../admin/course/page";
import AssignFaculty from "../admin/faculty/page";
import FacultyDashboard from "../faculty/courses/page";
import StudentDashboard from "../student/courses/page";

const Sidebar = ({ userRole, children }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState({name:"Dashboard"});

  const adminMenuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", icon: <FaUsers />, path:"/admin/user" },
    { name: "Courses", icon: <FaBook />, path:"/admin/course" },
    { name: "AssignFaculty", icon: <FaBook />, path:"/admin/faculty" },
  ];

  const facultyMenuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Courses", icon: <FaBook />, component: <FacultyDashboard /> },
  ];

  const studentMenuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "My Courses", icon: <FaBook />, component: <StudentDashboard /> },
  ];

  const menuItems =
    userRole === "admin"
      ? adminMenuItems
      : userRole === "faculty"
      ? facultyMenuItems
      : studentMenuItems;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-5">LMS Panel</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-all hover:bg-gray-800 ${
                  activeTab === item ? "bg-gray-700" : ""
                }`}
              >
                {item.icon} {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center gap-3 bg-red-600 p-3 rounded-md hover:bg-red-700"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold"
        >
          {activeTab?.name}
        </motion.h1>

        {/* Dummy Content */}
        
        <div className="mt-5 bg-white p-6 rounded-lg shadow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
