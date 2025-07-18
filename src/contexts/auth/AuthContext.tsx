"use client";
import { User } from "@/interfaces/User";
import { authReducer, AuthState } from "./AuthReducer";
import { createContext, useReducer } from "react";

type AuthContextProps = {
  user: User | null;
  status: "authenticated" | "non-authenticated" | "checking";
  auth: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

const authInitialState: AuthState = {
  status: "checking",
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);
export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const auth = (user: User) => {
    console.log("AuthContext: auth", user);
    dispatch({ type: "auth", payload: user });
    console.log("AuthContext: auth - user", user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  const updateUser = (user: User) => {
    dispatch({ type: "updateUser", payload: { user } });
  };

  return (
    <AuthContext.Provider value={{ ...state, auth, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
