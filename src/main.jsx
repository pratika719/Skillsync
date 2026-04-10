import React from "react";
import './index.css'
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./AppWrapper"; // 🔥 IMPORT

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <Toaster position="top-right" />
    <BrowserRouter>
      <AppWrapper /> {/* 🔥 USE WRAPPER */}
    </BrowserRouter>
  </Provider>
);