import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  editTask,
  getTasks,
  deleteTask,
} from "../features/tasks/taskservices";

// 📥 FETCH TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const docs = await getTasks(userId);
      return docs.map((doc) => ({      // ✅ map $id → id
        id: doc.$id,
        title: doc.title,
        completed: doc.completed,
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ➕ ADD TASK
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await createTask(taskData);
      return {
        id: res.$id,
        title: res.title,
        completed: res.completed,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔄 TOGGLE TASK
export const toggleTaskAsync = createAsyncThunk(
  "tasks/toggleTask",
  async (task, { rejectWithValue }) => {
    try {
      const updated = await editTask(task.id, {
        completed: !task.completed,
      });
      return {
        id: updated.$id,
        completed: updated.completed,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✏️ EDIT TASK
export const editTaskAsync = createAsyncThunk(
  "tasks/editTask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await editTask(id, data);
      return {
        id: updated.$id,
        title: updated.title,
        completed: updated.completed,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ❌ DELETE TASK
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTask(taskId);
      return taskId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧠 SLICE
const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null; // ✅ was: missing error reset
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // TOGGLE — ✅ added pending/rejected handlers
      .addCase(toggleTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const task = state.items.find((t) => t.id === action.payload.id);
        if (task) {
          task.completed = action.payload.completed;
        }
      })
      .addCase(toggleTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // EDIT — ✅ added pending/rejected; also now updates `completed`
      .addCase(editTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const task = state.items.find((t) => t.id === action.payload.id);
        if (task) {
          task.title = action.payload.title;
          task.completed = action.payload.completed; // ✅ was: missing
        }
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE — ✅ added pending/rejected handlers
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;