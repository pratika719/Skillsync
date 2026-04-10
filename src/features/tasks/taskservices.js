import { databases } from "../../appwrite/config";
import { Query, ID } from "appwrite"; // ✅ Import ID

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID;

export const createTask = async (taskData) => {
    console.log("DB_ID:", DATABASE_ID, "COL_ID:", COLLECTION_ID); // Check env vars
  console.log("taskData:", taskData); // Check userId is not undefined
  const res = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(), // ✅ was: "unique()" (a plain string — invalid)
    taskData
  );
  return res;
};

export const getTasks = async (userId) => {
  const res = await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  return res.documents;
};

export const deleteTask = async (taskId) => {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId);
  return taskId;
};

export const editTask = async (taskId, data) => {
  const res = await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    taskId,
    data
  );
  return res;
};