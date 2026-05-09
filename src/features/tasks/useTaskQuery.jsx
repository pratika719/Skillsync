import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSelectors";
import { getTasks, createTask, editTask, deleteTask } from "./taskService";
import toast from "react-hot-toast";

export const taskKeys = {
    all: ["tasks"],
    byUser: (userId) => ["tasks", userId],
};

export function useTaskQuery() {
    const user = useSelector(selectUser);
    const queryClient = useQueryClient();
    const key = taskKeys.byUser(user?.id);

const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: key,
        queryFn: () => getTasks(user.id),
        enabled: !!user?.id,
        select: (docs) =>
            docs.map((doc) => ({
                id: doc.$id,
                title: doc.title,
                completed: doc.completed,
                skillId: doc.skillId || null,
                userId: doc.userId,
            })),
    });

const addMutation = useMutation({
        mutationFn: (taskData) => createTask(taskData),
        onMutate: async (taskData) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

const tempId = `temp-${Date.now()}`;
            const tempTask = {
                id: tempId,
                title: taskData.title,
                completed: false,
                skillId: taskData.skillId || null,
                userId: taskData.userId,
            };
            queryClient.setQueryData(key, (old = []) => [...old, tempTask]);
            return { previous, tempId };
        },
        onError: (err, vars, context) => {

            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to add task ❌");
        },
        onSuccess: (newDoc, variables, context) => {

            queryClient.setQueryData(key, (old = []) =>
                old.map((t) =>
                    t.id === context.tempId
                        ? {
                            id: newDoc.$id,
                            title: newDoc.title,
                            completed: newDoc.completed,
                            skillId: newDoc.skillId || null,
                            userId: newDoc.userId,
                        }
                        : t
                )
            );
            toast.success("Task added ✅");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        }
    });

const toggleMutation = useMutation({
        mutationFn: (task) => editTask(task.id, { completed: !task.completed }),
        onMutate: async (task) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

            queryClient.setQueryData(key, (old = []) =>
                old.map((t) =>
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                )
            );
            return { previous };
        },
        onError: (err, task, context) => {
            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to update task ❌");
        },
        onSuccess: () => toast.success("Task updated ✅"),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        }
    });

const editMutation = useMutation({
        mutationFn: ({ id, data }) => editTask(id, data),
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

            queryClient.setQueryData(key, (old = []) =>
                old.map((t) => (t.id === id ? { ...t, ...data } : t))
            );
            return { previous };
        },
        onError: (err, vars, context) => {
            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to update task ❌");
        },
        onSuccess: () => toast.success("Task updated ✏️"),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        }
    });

const deleteMutation = useMutation({
        mutationFn: (taskId) => deleteTask(taskId),
        onMutate: async (taskId) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

            queryClient.setQueryData(key, (old = []) =>
                old.filter((t) => t.id !== taskId)
            );
            return { previous };
        },
        onError: (err, taskId, context) => {
            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to delete task ❌");
        },
        onSuccess: () => toast.success("Task deleted 🗑️"),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        }
    });

    return {
        tasks,
        isLoading,
        isError,
        createTask: (taskData) => addMutation.mutateAsync(taskData),
        toggleTask: (task) => toggleMutation.mutateAsync(task),
        updateTask: (id, data) => editMutation.mutateAsync({ id, data }),
        removeTask: (id) => deleteMutation.mutateAsync(id),
        isAdding: addMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}