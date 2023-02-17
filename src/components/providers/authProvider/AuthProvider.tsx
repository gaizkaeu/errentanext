import { createContext, useContext } from "react";
import { useGetCurrentUserQuery, useLogOutAccountMutation } from "@/store/endpoints/userAccounts";
import { AuthStatuses, IUser, MFAStatuses } from "@/store/types/User";
import { useAppSelector } from "@/store/hooks";
import { api } from "@/store/api";

export type AuthContextType = {
  isAuthenticated: AuthStatuses;
  isMFAuthenticated: MFAStatuses;
  fetched: boolean;
  currentUser: undefined | IUser;
  logout: () => void;
};

export const AuthContext = createContext({
  isAuthenticated: true,
  fetched: false,
  currentUser: undefined,
} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: { children: JSX.Element }) {
  const isAuthenticated = useAppSelector((state) => state.auth.status);
  const isMFAuthenticated = useAppSelector((state) => state.auth.status_mfa);

  const { currentData, isUninitialized, isLoading } = useGetCurrentUserQuery();

  const [logoutMutation] = useLogOutAccountMutation();

  async function logout() {
    await logoutMutation();
    api.util.resetApiState();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isMFAuthenticated,
        fetched: !isUninitialized && !isLoading,
        currentUser: currentData,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
