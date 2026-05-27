import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSelectors";
import { getSkills, createSkill, editSkill, deleteSkill } from "./skillService";
import toast from "react-hot-toast";

export const skillKeys = {
    all: ["skills"],
    byUser: (userId) => ["skills", userId],
};

export function useSkillQuery() {
    const user = useSelector(selectUser);
    const queryClient = useQueryClient();
    const key = skillKeys.byUser(user?.id);

const { data: skills = [], isLoading, isError } = useQuery({
        queryKey: key,
        queryFn: () => getSkills(user.id),
        enabled: !!user?.id,
        select: (docs) =>
            docs.map((doc) => ({
                id: doc.$id,
                title: doc.title,
                status: doc.status,
                userId: doc.userId,
            })),
    });
//wht it does is first canclequeries stops any further fetching thenprevious var takes cache data
//generate temp id and update cache
const addMutation = useMutation({
        mutationFn: (skillData) => createSkill(skillData),
        onMutate: async (skillData) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

            const tempId = `temp-${Date.now()}`;
            const tempSkill = {
                id: tempId,
                title: skillData.title,
                status: "not_started",
                userId: skillData.userId,
            };
//
queryClient.setQueryData(key, (old = []) => [...old, tempSkill]);
            return { previous, tempId };
        },
        onError: (err, vars, context) => {
            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to add skill ❌");
        },
        onSuccess: (newDoc, variables, context) => {

            queryClient.setQueryData(key, (old = []) =>
                old.map((s) =>
                    s.id === context.tempId
                        ? { id: newDoc.$id, title: newDoc.title, status: newDoc.status, userId: newDoc.userId }
                        : s
                )
            );
            toast.success("Skill added ✅");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        }
    });

const editMutation = useMutation({
        mutationFn: ({ id, data }) => editSkill(id, data),
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

            queryClient.setQueryData(key, (old = []) =>
                old.map((s) => (s.id === id ? { ...s, ...data } : s))
            );
            return { previous };
        },
        onError: (err, vars, context) => {
            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to update skill ❌");
        },
        onSuccess: () => toast.success("Status updated ✅"),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });
        }
    });

const deleteMutation = useMutation({
        mutationFn: (skillId) => deleteSkill(skillId),
        onMutate: async (skillId) => {
            await queryClient.cancelQueries({ queryKey: key });
            const previous = queryClient.getQueryData(key);

            queryClient.setQueryData(key, (old = []) =>
                old.filter((s) => s.id !== skillId)
            );
            return { previous };
        },
        onError: (err, skillId, context) => {
            queryClient.setQueryData(key, context.previous);
            toast.error("Failed to delete skill ❌");
        },
        onSuccess: () => toast.success("Skill deleted 🗑️"),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: key });

            queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] });
        }
    });

    return {
        skills,
        isLoading,
        isError,
        createSkill: (data) => addMutation.mutateAsync(data),
        updateSkill: (id, data) => editMutation.mutateAsync({ id, data }),
        removeSkill: (id) => deleteMutation.mutateAsync(id),
        isAdding: addMutation.isPending,
    };
}