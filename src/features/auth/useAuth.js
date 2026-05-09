import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { loginUser, logoutUser, signupUser, fetchUser as fetchUserAction } from "./authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(
    async (email, password) => {
      try {
        return await dispatch(loginUser({ email, password })).unwrap();
      } catch (err) {

        if (err?.code === 401) {
          await dispatch(logoutUser());
          return await dispatch(loginUser({ email, password })).unwrap();
        }
        throw err;
      }
    },
    [dispatch]
  );
  const signup = useCallback(
    (email, password) => dispatch(signupUser({ email, password })).unwrap(),
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch(logoutUser()).unwrap(),
    [dispatch]
  );

  const restoreSession = useCallback(
    () => dispatch(fetchUserAction()),
    [dispatch]
  );

  return { user, loading, error, login, signup, logout, restoreSession };
}
