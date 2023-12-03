import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import  UserProvider  from "../context/UserContext";

jest.mock("axios");

describe("UserProvider", () => {
  beforeEach(() => {
    // Clear mocks and reset state before each test
    jest.clearAllMocks();
  });

  it("should display an error message when fields are not filled", async () => {
    render(<UserProvider>{}</UserProvider>);
    
    await act(async () => {
      userEvent.click(screen.getByText("Save User"));
    });

    expect(screen.getByText("Please fill all fields")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("should display an error message when passwords do not match", async () => {
    render(<UserProvider>{}</UserProvider>);
    
    await act(async () => {
      userEvent.type(screen.getByLabelText("Name"), "John");
      userEvent.type(screen.getByLabelText("Email"), "john@example.com");
      userEvent.type(screen.getByLabelText("Password"), "password1");
      userEvent.type(screen.getByLabelText("Confirm Password"), "password2");
      userEvent.click(screen.getByText("Save User"));
    });

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("should create a user successfully when all fields are filled", async () => {
    render(<UserProvider>{}</UserProvider>);
    
    await act(async () => {
      userEvent.type(screen.getByLabelText("Name"), "John");
      userEvent.type(screen.getByLabelText("Email"), "john@example.com");
      userEvent.type(screen.getByLabelText("Password"), "password");
      userEvent.type(screen.getByLabelText("Confirm Password"), "password");
      userEvent.click(screen.getByText("Save User"));
    });

    // Assuming a successful response message is logged
    expect(screen.getByText("User created successfully")).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:4001/api/create-user",
      {
        name: "John",
        email: "john@example.com",
        password: "password",
        passwordConformation: "password",
      }
    );
  });

it("should display an error message when user creation fails", async () => {
    jest.mock("axios", () => ({
        post: jest.fn().mockRejectedValueOnce(new Error("Test error message")),
    }));

    render(<UserProvider>{}</UserProvider>);

    await act(async () => {
        userEvent.type(screen.getByLabelText("Name"), "John");
        userEvent.type(screen.getByLabelText("Email"), "john@example.com");
        userEvent.type(screen.getByLabelText("Password"), "password");
        userEvent.type(screen.getByLabelText("Confirm Password"), "password");
        userEvent.click(screen.getByText("Save User"));
    });

    expect(screen.getByText("Error Creating User")).toBeInTheDocument();});
});
