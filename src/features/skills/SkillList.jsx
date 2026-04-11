import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkill } from "../../store/skillslice";
import SkillCard from "./SkillCard";

function SkillList() {
  const dispatch = useDispatch();
  const { items: skills, loading } = useSelector((state) => state.skills);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchSkill(user.id));
    }
  }, [user, dispatch]);

  if (loading) return <p className="text-gray-500">Loading skills...</p>;
  if (!skills || skills.length === 0)
    return <p className="text-gray-400">No skills found</p>;

  return (
    <div className="space-y-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}

export default SkillList;