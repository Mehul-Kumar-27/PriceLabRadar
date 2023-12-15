import React, { useState, ReactNode, Dispatch } from "react";
import UserModle from "../modles/UserModle";
import axiosInstance from "../network/axiso";
import axios from "axios";

export interface UserContextInterface {
  user: UserModle;
  setUser: Dispatch<React.SetStateAction<UserModle>>;
  hello: () => void;
  saveUser: (
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  ) => void;
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

  saveUser: (
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  ) => {},
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

  const saveUser = async (
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  ) => {
    try {
      // Validate input
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill all fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Create user data object
      const userData = {
        name: name,
        email: email,
        password: password,
        passwordConformation: confirmPassword,
      };

      console.log("userData", userData);

      const response = await axios.post(
        "http://localhost:4001/api/create-user",
        userData
      );

      if (response.status == 200) {
        console.log("User created successfully:", response.data);
      }
      // console.log("User created successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error);

      setError("Error Creating User");
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
