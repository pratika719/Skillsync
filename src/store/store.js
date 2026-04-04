import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice"; // 👈 CHECK NAME

const store=configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store ;

