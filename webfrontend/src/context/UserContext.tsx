import React, { useState, ReactNode, Dispatch } from "react";
import UserModle from "../modles/UserModle";

export interface UserContextInterface {
  user: UserModle;
  setUser: Dispatch<React.SetStateAction<UserModle>>;
  hello: () => void;
  saveUser: () => void;
  error: string;
  setError: Dispatch<React.SetStateAction<string>>;
}

const defaultUserContext = {
  user: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  setUser: () => {},
  hello: () => {},

  saveUser: () => {},
  error: "",
  setError: () => {},
} as UserContextInterface;

export const UserContext =
  React.createContext<UserContextInterface>(defaultUserContext);

type UserContextProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserModle>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const hello = () => {
    console.log("hello");
  };

  const saveUser = (
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  ) => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    

  };

  return (
    <UserContext.Provider
      value={{ user, setUser, hello, saveUser, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
}
