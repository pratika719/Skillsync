import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { fetchTasks, addTask, editTaskAsync, deleteTaskAsync, toggleTaskAsync } from "../store/taskslice";
import { selectAllTasks, selectAllSkills, selectUser } from "../store/selectors";

export function useTasks() {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const skills = useSelector(selectAllSkills);
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector((state) => state.tasks.error);
    const user = useSelector(selectUser)

    const loadTasks = useCallback(() => {
        if (user) dispatch(fetchTasks(user.id));
    }, [dispatch, user]);

    const createTask = useCallback((title, skillId = null) => 
        dispatch(addTask({ title, completed: false, userId: user?.id, skillId: skillId || null })).unwrap()
    , [dispatch, user])

   const toggleTask = useCallback((task) => dispatch(toggleTaskAsync(task)).unwrap(), [dispatch])
    const removeTask = useCallback((id) => dispatch(deleteTaskAsync(id)).unwrap(), [dispatch])

    return { tasks, loading, error, loadTasks, createTask, toggleTask, removeTask,loadTasks,skills };



}

