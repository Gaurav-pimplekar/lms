import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  users: []
};

export const getAllUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/auth"); // Wait for response
    console.log("user response get call", res);
    return res.data; // Return the actual data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch users"); // Handle errors
  }
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers : (builder) =>{
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Ensure `users` exists in API response
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
