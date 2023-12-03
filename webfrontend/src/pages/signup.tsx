import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { saveUser } = useContext(UserContext);

  const handleSignUp = () => {
    saveUser(name, email, password, confirmPassword);
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "50px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0px 0px 10px rgba(1,1,1,1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          PriceLabRadar
        </h1>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Sign Up</h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "10px" }}>Name</label>
          <input
            type="text"
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label style={{ marginBottom: "10px" }}>Email</label>
          <input
            type="email"
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{ marginBottom: "10px" }}>Password</label>
          <input
            type="password"
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <label style={{ marginBottom: "10px" }}>Confirm Password</label>
          <input
            type="password"
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <button
            style={{
              backgroundColor: "purple",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
