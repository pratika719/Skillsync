import { databases } from "../../appwrite/config";
import { Query, ID } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID;

export const createSkill = async (skilldata) => {
  const res = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    skilldata

  );
  return res
};

export const getSkills = async (userId) => {
  const res = await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  return res.documents;


}


export const deleteSkill = async (skillId) => {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, skillId);
  return skillId;
};


export const editSkill = async (skillId, data) => {
  const res = await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    skillId,
    data
  );
  return res;
};
