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
    <div>
      <Sidebar/>
    </div>
  );
};

export default CourseManagement;
