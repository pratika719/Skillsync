import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import taskReducer from "@/features/tasks/taskSlice";
import skillReducer from "@/features/skills/skillSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
        skills: skillReducer,
    }
})

export default store;
