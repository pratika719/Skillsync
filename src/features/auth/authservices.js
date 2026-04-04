import { account } from "../../appwrite/config";

// 🔐 SIGNUP
export const signup = async (email, password) => {
    return await account.create(
        "unique()", // userId
        email,
        password
    );
};

// 🔐 LOGIN
export const login = async (email, password) => {
    return await account.createEmailPasswordSession(email, password);
};

// 🔐 LOGOUT
export const logout = async () => {
    return await account.deleteSession("current");
};

// 🔐 GET CURRENT USER (CRITICAL FOR PERSISTENCE)
export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        return null;
    }
};