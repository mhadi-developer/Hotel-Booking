import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const loggedInUser = useAuthStore(
    (state) => state.loggedInUser
  );

  const getLoggedInUser = useAuthStore(
    (state) => state.getLoggedInUser
  );

  const loading = useAuthStore(
    (state) => state.loading
    );
    const logout = useAuthStore(
        (state)=> state.logout
    )

  return {
    loggedInUser,
    getLoggedInUser,
      loading,
    logout
  };
};