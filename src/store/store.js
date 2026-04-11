import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice"; // 👈 CHECK NAME
import taskReducer from "./taskslice";
import skillReducer from "./skillslice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        tasks: taskReducer,
         skills: skillReducer,

    }
})

export default store ;

