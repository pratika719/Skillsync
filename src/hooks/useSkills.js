import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { fetchSkill, addSkill, editSkillAsync, deleteSkillAsync } from "../store/skillslice";
import { selectAllSkills } from "../store/selectors";

export function useSkills() {
    const dispatch = useDispatch();
    const skills = useSelector(selectAllSkills);
    const loading = useSelector((state) => state.skills.loading);
    const error = useSelector((state) => state.skills.error);
    const user = useSelector((state) => state.auth.user)

    const loadSkills = useCallback(() => {
        if (user) dispatch(fetchSkill(user.id))
    }, [dispatch, user])

    const createSkill = useCallback((title) => 
        dispatch(addSkill({ title, status: "not_started", userId: user?.id })).unwrap()
    , [dispatch, user])

    const updateSkill = useCallback((id, data) => dispatch(editSkillAsync({ id, data })).unwrap(), [dispatch])

    const removeSkill = useCallback((id) => dispatch(deleteSkillAsync(id)).unwrap(), [dispatch])

    return { skills, loading, error, loadSkills, createSkill, updateSkill, removeSkill }
}