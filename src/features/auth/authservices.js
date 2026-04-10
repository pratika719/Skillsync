import { account } from "../../appwrite/config";

export const signup = async (email, password) => {
    try {
        const res = await account.create(
            "unique()",
            email,
            password
        );

        console.log("SIGNUP SUCCESS:", res);
        return res;

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        throw error;
    }
};

// 🔐 LOGIN
export const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);

    const user = await account.get();
    console.log("USER:", user);

    return user;
};

// 🔐 LOGOUT
export const logout = async () => {
    return await account.deleteSession("current");
};
export const getCurrentUser = async () => {
  const user = await account.get();

  // ✅ Return ONLY plain data
  return {
    id: user.$id,
    name: user.name,
    email: user.email,
  };
};