import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
