import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  faculty: null,
  loading: false,
  error: null,
  faculties: []
};

export const getAllfaculties = createAsyncThunk("user/getfaculties", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/faculty"); // Wait for response
    console.log("user response get call", res);
    return res.data; // Return the actual data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch users"); // Handle errors
  }
});


const facultySlice = createSlice({
  name: "faculty",
  initialState,
  extraReducers : (builder) =>{
    builder
      .addCase(getAllfaculties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllfaculties.fulfilled, (state, action) => {
        state.loading = false;
        state.faculties = action.payload; // Ensure `users` exists in API response
      })
      .addCase(getAllfaculties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export default facultySlice.reducer;
