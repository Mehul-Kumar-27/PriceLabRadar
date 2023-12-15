import React, { useState, ReactNode, Dispatch } from "react";
import UserModle from "../modles/UserModle";
import axiosInstance from "../network/axiso";
import axios from "axios";
import ProductModle from "../modles/ProductModle";

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
  product: ProductModle;
  getProductData: (url?: string) => void;
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
  product: {},
  getProductData: (url?: string) => {},
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
  const [product, setproduct] = useState<ProductModle>({});

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

  const getProductData = async (url?: string) => {
    try {
      if (!url) {
        throw new Error("Please enter a URL");
      }

      const response = await axiosInstance.get(
        "http://localhost:4001/api/get-product-data",
        {
          params: {
            url: url,
          },
        }
      );

      if (response.status == 200) {
        console.log("Product data:", response.data);
      }

      const productData = response.data[0];

      const productModel: ProductModle = {
        Title: productData.Title,
        Rating: productData.Rating,
        Price: productData.Price,
      };

      setproduct(productModel);
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        hello,
        saveUser,
        error,
        setError,
        product,
        getProductData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
