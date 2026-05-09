import { account } from "@/lib/appwrite";

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

export const login = async (email, password) => {
    try {

        try {
            await account.deleteSession("current");
        } catch {

        }

        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        return user;
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        throw error;
    }
};

export const logout = async () => {
    return await account.deleteSession("current");
};
export const getCurrentUser = async () => {
    const user = await account.get();

return {
        id: user.$id,
        name: user.name,
        email: user.email,
    };
};
