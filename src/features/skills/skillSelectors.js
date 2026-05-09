import { createSelector } from "@reduxjs/toolkit";

export const selectAllSkills = (state) => state.skills.items;
export const selectSkillsLoading = (state) => state.skills.loading;
