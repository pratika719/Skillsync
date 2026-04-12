import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { loginUser, logoutUser, signupUser, fetchUser as fetchUserAction } from "../store/authslice"; // ✅ rename import

export function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(
    (email, password) => dispatch(loginUser({ email, password })).unwrap(), // ✅ return added
    [dispatch]
  );

  const signup = useCallback(
    (email, password) => dispatch(signupUser({ email, password })).unwrap(), // ✅ return added
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch(logoutUser()).unwrap(), // ✅ return added
    [dispatch]
  );

  const restoreSession = useCallback(
    () => dispatch(fetchUserAction()), // ✅ uses renamed import, no .unwrap() needed here
    [dispatch]
  );

  return { user, loading, error, login, signup, logout, restoreSession };
  // ✅ removed the duplicate fetchUser from return — restoreSession covers it
}