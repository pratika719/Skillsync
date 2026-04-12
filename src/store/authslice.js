import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, getCurrentUser } from "../features/auth/authservices";
import { signup } from "../features/auth/authservices";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await login(email, password);
      toast.success("Login successful ✅");
      console.log("login res:", res)
      return {
        id: res.$id,
        email: res.email,
      };
    } catch (err) {
      toast.error(err.message || "Login failed ❌");
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async () => {
    try {
      const user = await getCurrentUser();
      return user
    } catch (err) {
      toast.error(err.message || "Failed to fetch user ❌");
      return rejectWithValue(err.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    await logout();
  }
);
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signup(email, password);

      toast.success("Signup successful 🎉");

      return {
        id: res.$id,
        email: res.email,
      };

    } catch (err) {
      toast.error(err.message || "Signup failed ❌");
      return rejectWithValue(err.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
})


export default authSlice.reducer;
