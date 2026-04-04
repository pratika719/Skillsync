import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, getCurrentUser } from "../features/auth/authservices";


export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async({email,password})=>{
        return await login(email,password);

    }
)

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async () => {
        return await getCurrentUser();
    }
);


export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        await logout();
    }
);

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:true,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
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
