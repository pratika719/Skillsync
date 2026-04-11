import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getSkills,createSkill,deleteSkill,editSkill } from "../features/skills/skillservice";

export const fetchSkill = createAsyncThunk(
    "skills/fetchskills",
    async (userId,{rejectWithValue})=>{
        try {
            const docs=await getSkills(userId);
             return docs.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        status: doc.status,
        userId: doc.userId,
      }));
            
        } catch (err) {
            return rejectWithValue(err.message);
            
        }
    }
)

export const addSkill = createAsyncThunk(
  "skills/addSkill",
  async (skillData, { rejectWithValue }) => {
    try {
      const res = await createSkill(skillData);
      return {
        id: res.$id,
        title: res.title,
        status: res.status,
        userId: res.userId,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)


export const editSkillAsync = createAsyncThunk(
  "skills/editSkill",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await editSkill(id, data);
      return {
        id: res.$id,
        title: res.title,
        status: res.status,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteSkillAsync = createAsyncThunk(
  "skills/deleteSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      await deleteSkill(skillId);
      return skillId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const skillSlice=createSlice({
  name:"skills",
  initialState:{
    items:[],
    loading:false,
    error:null,
  },reducers:{},
extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ADD
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // EDIT
      .addCase(editSkillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSkillAsync.fulfilled, (state, action) => {
        state.loading = false;
        const skill = state.items.find((s) => s.id === action.payload.id);
        if (skill) {
          skill.title = action.payload.title;
          skill.status = action.payload.status;
        }
      })
      .addCase(editSkillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE
      .addCase(deleteSkillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkillAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteSkillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillSlice.reducer