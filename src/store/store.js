import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice"; // 👈 CHECK NAME
import taskReducer from "./taskslice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        tasks: taskReducer
    }
})

export default store ;

