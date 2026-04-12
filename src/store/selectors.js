import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;


export const selectAllTasks = (state) => state.tasks.items;
export const selectTasksLoading = (state) => state.tasks.loading;
export const selectTasksError = (state) => state.tasks.error;

export const selectAllSkills = (state) => state.skills.items;
export const selectSkillsLoading = (state) => state.skills.loading;



export const selectCompletedTasks = createSelector(selectAllTasks, (tasks) => tasks.filter((t) => t.completed));
export const selectPendingTasks = createSelector(selectAllTasks, (tasks) => tasks.filter((t) => !t.completed))
// ✅ factory selector — returns a function
export const selectTaskBySkill = (skillId) => (state) =>
  state.tasks.items.filter((t) => t.skillId === skillId);
export const selectRecentTasks = createSelector(selectAllTasks, (tasks) => [...tasks].slice(-5).reverse());
