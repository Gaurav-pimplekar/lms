"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";
import facultyReducer from "./slices/facultySlice";
import studentReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    faculty: facultyReducer,
    student: studentReducer
  },
});

export default store;
